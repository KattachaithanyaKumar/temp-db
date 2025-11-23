export type FieldType = "string" | "number" | "boolean" | "uuid" | "date" | "email" | "object" | "array" | "";

export interface Field {
    id: string;
    name: string;
    type: FieldType;

    fields?: Field[];

    of?: {
        type: FieldType;
        fields?: Field[];
    }
}