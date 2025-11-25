/**
 * Valida que el texto solo contenga caracteres alfanuméricos y espacios
 * @param text - Texto a validar
 * @returns true si es válido, false si no
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
 */
export const isNotEmpty = (text: string): boolean => {
  return text.trim().length > 0;
};

export interface ValidationResult {
  isValid: boolean;
  error: string;
}

/**
 * Valida un campo de texto con las reglas del formulario
 * @param value - Valor a validar
 * @param fieldName - Nombre del campo (para mensajes de error)
 * @returns Resultado de la validación
 */
export const validateField = (value: string, fieldName: string): ValidationResult => {
  if (!isNotEmpty(value)) {
    return {
      isValid: false,
      error: `El ${fieldName} no puede estar vacío`,
    };
  }

  if (!isAlphanumeric(value)) {
    return {
      isValid: false,
      error: `El ${fieldName} solo puede contener letras, números y espacios`,
    };
  }

  return {
    isValid: true,
    error: '',
  };
};
