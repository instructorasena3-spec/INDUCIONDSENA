import { Apprentice, Ficha, Question } from '../types/induction';

const SHEETS_API_BASE = 'https://sheets.googleapis.com/v4/spreadsheets';

export interface SheetSyncResult {
  success: boolean;
  spreadsheetId: string;
  spreadsheetUrl: string;
  message?: string;
  updatedRows?: number;
}

// Columns for Tab 1: Consolidado de Aprendices
export const SHEET_HEADERS = [
  'Fecha de Registro',
  'Tipo Documento',
  'Número Documento',
  'Nombre Completo del Aprendiz',
  'Correo Electrónico',
  'Teléfono',
  'Código Ficha',
  'Programa de Formación',
  'Módulos Completados',
  'Progreso Inducción %',
  'Puntaje Evaluación %',
  'Intentos Realizados',
  'Estado de Inducción',
  'Folio Certificado Digital'
];

// Columns for Tab 2: Respuestas en Vivo (Cada respuesta a medida que responden)
export const ANSWERS_SHEET_HEADERS = [
  'Fecha y Hora',
  'Tipo Doc',
  'Documento',
  'Nombre del Aprendiz',
  'Código Ficha',
  'ID Pregunta',
  'Pregunta Formulada',
  'Respuesta Seleccionada por el Aprendiz',
  'Resultado',
  'Eje Temático'
];

/**
 * Get cached Spreadsheet ID for a Ficha from localStorage
 */
export const getStoredSpreadsheetId = (fichaId: string): string | null => {
  return localStorage.getItem(`sena_sheet_id_${fichaId}`);
};

/**
 * Store Spreadsheet ID for a Ficha in localStorage
 */
export const storeSpreadsheetId = (fichaId: string, sheetId: string) => {
  localStorage.setItem(`sena_sheet_id_${fichaId}`, sheetId);
};

/**
 * Builds the URL to view/edit the Google Sheet in Google Drive
 */
export const getSpreadsheetUrl = (spreadsheetId: string): string => {
  return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
};

/**
 * Format an apprentice object into a row of values
 */
export const formatApprenticeRow = (ficha: Ficha, app: Apprentice): (string | number)[] => {
  const completedCount = app.completedModules.length;
  const modulesSummary =
    completedCount > 0
      ? `${completedCount}/5 (${app.completedModules.join(', ')})`
      : '0/5 (Sin iniciar)';

  const scoreText =
    app.assessmentScore !== undefined ? `${app.assessmentScore}%` : 'Pendiente';

  const dateText = app.assessmentDate
    ? new Date(app.assessmentDate).toLocaleString('es-CO')
    : new Date().toLocaleString('es-CO');

  return [
    dateText,
    app.documentType,
    app.documentNumber,
    app.fullName,
    app.email,
    app.phone || 'N/A',
    ficha.code,
    ficha.programName,
    modulesSummary,
    `${app.progressPercentage}%`,
    scoreText,
    app.assessmentAttempts,
    app.status.toUpperCase(),
    app.certificateFolio || 'Sin emitir'
  ];
};

/**
 * Format an individual question response row
 */
export const formatQuestionAnswerRow = (
  ficha: Ficha,
  apprentice: Apprentice,
  question: Question,
  selectedOptionIndex: number,
  isCorrect: boolean
): (string | number)[] => {
  const selectedText =
    selectedOptionIndex >= 0 && selectedOptionIndex < question.options.length
      ? question.options[selectedOptionIndex]
      : 'Sin responder';

  return [
    new Date().toLocaleString('es-CO'),
    apprentice.documentType,
    apprentice.documentNumber,
    apprentice.fullName,
    ficha.code,
    question.id,
    question.question,
    selectedText,
    isCorrect ? 'CORRECTO (+1)' : 'INCORRECTO (0)',
    question.categoryLabel || question.category
  ];
};

/**
 * Creates a new styled Google Spreadsheet with 2 tabs in Google Drive:
 * 1. 'Registro de Aprendices' (Consolidado general)
 * 2. 'Respuestas en Vivo' (Registro a medida que responden preguntas)
 */
export const createFichaSpreadsheet = async (
  ficha: Ficha,
  accessToken: string
): Promise<{ spreadsheetId: string; spreadsheetUrl: string }> => {
  const title = `SENA Inducción - Ficha ${ficha.code} - ${ficha.programName.slice(0, 35)}`;

  const createBody = {
    properties: {
      title
    },
    sheets: [
      {
        properties: {
          title: 'Registro de Aprendices',
          gridProperties: {
            rowCount: 200,
            columnCount: SHEET_HEADERS.length,
            frozenRowCount: 1
          }
        }
      },
      {
        properties: {
          title: 'Respuestas en Vivo',
          gridProperties: {
            rowCount: 500,
            columnCount: ANSWERS_SHEET_HEADERS.length,
            frozenRowCount: 1
          }
        }
      }
    ]
  };

  const response = await fetch(SHEETS_API_BASE, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createBody)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al crear hoja de cálculo en Drive: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const spreadsheetId = data.spreadsheetId;
  const sheet0Id = data.sheets?.[0]?.properties?.sheetId || 0;
  const sheet1Id = data.sheets?.[1]?.properties?.sheetId || 1;

  // Insert headers into Tab 1 ('Registro de Aprendices')
  await fetch(
    `${SHEETS_API_BASE}/${spreadsheetId}/values/'Registro de Aprendices'!A1:N1?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ values: [SHEET_HEADERS] })
    }
  );

  // Insert headers into Tab 2 ('Respuestas en Vivo')
  await fetch(
    `${SHEETS_API_BASE}/${spreadsheetId}/values/'Respuestas en Vivo'!A1:J1?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ values: [ANSWERS_SHEET_HEADERS] })
    }
  );

  // Apply styling via batchUpdate (header background green #39A900, white bold text)
  try {
    await fetch(`${SHEETS_API_BASE}/${spreadsheetId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: sheet0Id,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: SHEET_HEADERS.length
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: { red: 0.223, green: 0.662, blue: 0.0 }, // #39A900 SENA Green
                  textFormat: { foregroundColor: { red: 1.0, green: 1.0, blue: 1.0 }, bold: true, fontSize: 10 },
                  horizontalAlignment: 'CENTER',
                  verticalAlignment: 'MIDDLE'
                }
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)'
            }
          },
          {
            repeatCell: {
              range: {
                sheetId: sheet1Id,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: ANSWERS_SHEET_HEADERS.length
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: { red: 0.08, green: 0.45, blue: 0.8 }, // Google Blue
                  textFormat: { foregroundColor: { red: 1.0, green: 1.0, blue: 1.0 }, bold: true, fontSize: 10 },
                  horizontalAlignment: 'CENTER',
                  verticalAlignment: 'MIDDLE'
                }
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)'
            }
          }
        ]
      })
    });
  } catch (formatErr) {
    console.warn('Advertencia al aplicar estilos visuales a la hoja:', formatErr);
  }

  storeSpreadsheetId(ficha.id, spreadsheetId);
  return {
    spreadsheetId,
    spreadsheetUrl: getSpreadsheetUrl(spreadsheetId)
  };
};

/**
 * Ensures a spreadsheet exists for the Ficha, creating it if necessary
 */
export const ensureSpreadsheet = async (
  ficha: Ficha,
  accessToken: string
): Promise<{ spreadsheetId: string; spreadsheetUrl: string }> => {
  const existingId = getStoredSpreadsheetId(ficha.id);

  if (existingId) {
    // Validate that the spreadsheet is accessible
    try {
      const checkRes = await fetch(`${SHEETS_API_BASE}/${existingId}?fields=spreadsheetId,sheets.properties.title`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (checkRes.ok) {
        const metadata = await checkRes.json();
        const hasAnswersSheet = metadata.sheets?.some(
          (s: any) => s.properties?.title === 'Respuestas en Vivo'
        );

        // If the sheet exists but lacks 'Respuestas en Vivo' tab, add it
        if (!hasAnswersSheet) {
          try {
            await fetch(`${SHEETS_API_BASE}/${existingId}:batchUpdate`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                requests: [
                  {
                    addSheet: {
                      properties: {
                        title: 'Respuestas en Vivo',
                        gridProperties: { rowCount: 500, columnCount: ANSWERS_SHEET_HEADERS.length }
                      }
                    }
                  }
                ]
              })
            });

            // Insert headers in the newly added sheet
            await fetch(
              `${SHEETS_API_BASE}/${existingId}/values/'Respuestas en Vivo'!A1:J1?valueInputOption=USER_ENTERED`,
              {
                method: 'PUT',
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ values: [ANSWERS_SHEET_HEADERS] })
              }
            );
          } catch (tabErr) {
            console.warn('Advertencia agregando pestaña de respuestas:', tabErr);
          }
        }

        return {
          spreadsheetId: existingId,
          spreadsheetUrl: getSpreadsheetUrl(existingId)
        };
      }
    } catch {
      // If inaccessible, fall through to create a new one
    }
  }

  return await createFichaSpreadsheet(ficha, accessToken);
};

/**
 * Sync a single apprentice row to Tab 1 ('Registro de Aprendices')
 */
export const syncApprenticeToGoogleSheet = async (
  ficha: Ficha,
  apprentice: Apprentice,
  accessToken: string
): Promise<SheetSyncResult> => {
  try {
    const { spreadsheetId, spreadsheetUrl } = await ensureSpreadsheet(ficha, accessToken);
    const rowValues = formatApprenticeRow(ficha, apprentice);

    // Read column C (Documento) in 'Registro de Aprendices'
    const readRes = await fetch(
      `${SHEETS_API_BASE}/${spreadsheetId}/values/'Registro de Aprendices'!C:C`,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );

    let targetRow = -1;
    if (readRes.ok) {
      const data = await readRes.json();
      const rows = data.values || [];
      for (let i = 1; i < rows.length; i++) {
        if (rows[i] && rows[i][0] === apprentice.documentNumber) {
          targetRow = i + 1; // 1-indexed for Sheets
          break;
        }
      }
    }

    if (targetRow > 1) {
      // Update existing row
      const updateRange = `'Registro de Aprendices'!A${targetRow}:N${targetRow}`;
      const updateRes = await fetch(
        `${SHEETS_API_BASE}/${spreadsheetId}/values/${updateRange}?valueInputOption=USER_ENTERED`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ values: [rowValues] })
        }
      );

      if (!updateRes.ok) {
        throw new Error(`Error actualizando fila en Google Sheets: ${updateRes.status}`);
      }
    } else {
      // Append new row
      const appendRes = await fetch(
        `${SHEETS_API_BASE}/${spreadsheetId}/values/'Registro de Aprendices'!A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ values: [rowValues] })
        }
      );

      if (!appendRes.ok) {
        throw new Error(`Error agregando fila a Google Sheets: ${appendRes.status}`);
      }
    }

    return {
      success: true,
      spreadsheetId,
      spreadsheetUrl,
      updatedRows: 1
    };
  } catch (err: any) {
    console.error('Error sincronizando aprendiz con Google Sheets:', err);
    return {
      success: false,
      spreadsheetId: '',
      spreadsheetUrl: '',
      message: err.message || 'Error de sincronización con Google Sheets'
    };
  }
};

/**
 * Real-time sync: Append an individual question response row to Tab 2 ('Respuestas en Vivo')
 * This gets called immediately AS the apprentice answers each question!
 */
export const syncQuestionAnswerToGoogleSheet = async (
  ficha: Ficha,
  apprentice: Apprentice,
  question: Question,
  selectedOptionIndex: number,
  isCorrect: boolean,
  accessToken: string
): Promise<SheetSyncResult> => {
  try {
    const { spreadsheetId, spreadsheetUrl } = await ensureSpreadsheet(ficha, accessToken);
    const rowValues = formatQuestionAnswerRow(
      ficha,
      apprentice,
      question,
      selectedOptionIndex,
      isCorrect
    );

    // Append to 'Respuestas en Vivo'
    const appendRes = await fetch(
      `${SHEETS_API_BASE}/${spreadsheetId}/values/'Respuestas en Vivo'!A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ values: [rowValues] })
      }
    );

    if (!appendRes.ok) {
      throw new Error(`Error registrando respuesta en Google Sheets: ${appendRes.status}`);
    }

    return {
      success: true,
      spreadsheetId,
      spreadsheetUrl,
      updatedRows: 1,
      message: `Respuesta a pregunta "${question.id}" registrada en Google Sheets.`
    };
  } catch (err: any) {
    console.error('Error sincronizando respuesta individual en Google Sheets:', err);
    return {
      success: false,
      spreadsheetId: '',
      spreadsheetUrl: '',
      message: err.message || 'Error registrando respuesta individual en Google Sheets'
    };
  }
};

/**
 * Bulk sync all apprentices of a Ficha to Tab 1 of the Google Sheet
 */
export const syncAllApprenticesToGoogleSheet = async (
  ficha: Ficha,
  apprentices: Apprentice[],
  accessToken: string
): Promise<SheetSyncResult> => {
  try {
    const { spreadsheetId, spreadsheetUrl } = await ensureSpreadsheet(ficha, accessToken);
    const fichaApprentices = apprentices.filter((a) => a.fichaId === ficha.id);

    if (fichaApprentices.length === 0) {
      return {
        success: true,
        spreadsheetId,
        spreadsheetUrl,
        updatedRows: 0,
        message: 'No hay aprendices registrados en esta ficha.'
      };
    }

    const allRows = [
      SHEET_HEADERS,
      ...fichaApprentices.map((app) => formatApprenticeRow(ficha, app))
    ];

    const range = `'Registro de Aprendices'!A1:N${allRows.length}`;
    const updateRes = await fetch(
      `${SHEETS_API_BASE}/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ values: allRows })
      }
    );

    if (!updateRes.ok) {
      const errText = await updateRes.text();
      throw new Error(`Error en sincronización por lote: ${updateRes.status} - ${errText}`);
    }

    return {
      success: true,
      spreadsheetId,
      spreadsheetUrl,
      updatedRows: fichaApprentices.length,
      message: `Se sincronizaron con éxito ${fichaApprentices.length} aprendices en Google Sheets.`
    };
  } catch (err: any) {
    console.error('Error en sincronización por lote:', err);
    return {
      success: false,
      spreadsheetId: '',
      spreadsheetUrl: '',
      message: err.message || 'Error sincronizando aprendices con Google Sheets'
    };
  }
};
