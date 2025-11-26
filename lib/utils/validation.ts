import { z } from 'zod';
import { taskTitleSchema } from './zodSchemas';

/**
 * Valida que el texto solo contenga caracteres alfanuméricos y espacios
 * @param text - Texto a validar
 * @returns true si es válido, false si no
 * @deprecated Usa los esquemas de Zod en su lugar
 */
export const isAlphanumeric = (text: string): boolean => {
  // Permite letras (incluyendo acentos), números y espacios
  const alphanumericRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s]+$/;
  return alphanumericRegex.test(text);
};

/**
 * Valida que el texto no esté vacío
 * @param text - Texto a validar
 * @returns true si no está vacío, false si está vacío
 * @deprecated Usa los esquemas de Zod en su lugar
 */
export const isNotEmpty = (text: string): boolean => {
  return text.trim().length > 0;
};

export interface ValidationResult {
  isValid: boolean;
  error: string;
}

/**
 * Valida un campo de texto con las reglas del formulario usando Zod
 * @param value - Valor a validar
 * @param fieldName - Nombre del campo (para mensajes de error)
 * @returns Resultado de la validación
 */
export const validateField = (value: string, fieldName: string): ValidationResult => {
  // La descripción es opcional, siempre es válida
  if (fieldName === 'descripción') {
    return {
      isValid: true,
      error: '',
    };
  }

  try {
    const schema = taskTitleSchema;
    schema.parse(value);
    return {
      isValid: true,
      error: '',
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        error: error.errors[0]?.message || `El ${fieldName} no es válido`,
      };
    }
    return {
      isValid: false,
      error: `Error al validar el ${fieldName}`,
    };
  }
};
