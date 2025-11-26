import { z } from 'zod';

/**
 * Esquema de validación para el título de una tarea
 */
export const taskTitleSchema = z
  .string()
  .trim()
  .min(1, 'El título no puede estar vacío')
  .refine((val) => val.length > 0, {
    message: 'El título no puede contener solo espacios',
  })
  .regex(
    /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s]+$/,
    'El título solo puede contener letras, números y espacios'
  );

/**
 * Esquema de validación para la descripción de una tarea
 */
export const taskDescriptionSchema = z
  .string()
  .trim()
  .min(1, 'La descripción no puede estar vacía')
  .refine((val) => val.length > 0, {
    message: 'La descripción no puede contener solo espacios',
  })
  .regex(
    /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s]+$/,
    'La descripción solo puede contener letras, números y espacios'
  );

/**
 * Esquema de validación completo para una tarea
 */
export const taskSchema = z.object({
  title: taskTitleSchema,
  description: taskDescriptionSchema,
});

/**
 * Tipo inferido del esquema de tarea
 */
export type TaskFormData = z.infer<typeof taskSchema>;
