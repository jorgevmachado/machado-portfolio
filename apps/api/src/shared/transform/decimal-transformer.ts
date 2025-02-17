import { ValueTransformer } from 'typeorm';

export class DecimalTransformer implements ValueTransformer {
    to(decimal?: number): string | null {
        return decimal?.toString() || null;
    }

    from(decimal?: string): number | null {
        return decimal ? parseFloat(decimal) : null;
    }
}