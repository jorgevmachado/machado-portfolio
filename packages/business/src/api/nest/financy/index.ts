interface ISupplierType {
    id: string;
    name: string;
}

const TYPES_OF_SUPPLIERS: Array<ISupplierType> = [
    {
        id: '1',
        name: 'Habitação'
    },
    {
        id: '2',
        name: 'Alimentação'
    },
    {
        id: '3',
        name: 'Transporte'
    },
    {
        id: '4',
        name: 'Saúde'
    },
    {
        id: '5',
        name: 'Lazer'
    },
    {
        id: '6',
        name: 'Educação'
    },
];

interface ISupplierCategory {
    id: string;
    name: string;
    type: ISupplierType;
}

const SUPPLIER_CATEGORIES: Array<ISupplierCategory> = [
    {
        id: '1',
        name: 'Aluguel',
        type: TYPES_OF_SUPPLIERS[0]
    },
    {
        id: '2',
        name: 'Condomínio',
        type: TYPES_OF_SUPPLIERS[0]
    },
    {
        id: '3',
        name: 'Luz',
        type: TYPES_OF_SUPPLIERS[0]
    },
    {
        id: '4',
        name: 'IPTU',
        type: TYPES_OF_SUPPLIERS[0]
    },
    {
        id: '5',
        name: 'Internet',
        type: TYPES_OF_SUPPLIERS[0]
    },
    {
        id: '6',
        name: 'Garagem',
        type: TYPES_OF_SUPPLIERS[0]
    },
    {
        id: '7',
        name: 'Diarista',
        type: TYPES_OF_SUPPLIERS[0]
    },
    {
        id: '8',
        name: 'Mercado',
        type: TYPES_OF_SUPPLIERS[1]
    },
    {
        id: '9',
        name: 'Comida por Aplicativo',
        type: TYPES_OF_SUPPLIERS[1]
    },
    {
        id: '10',
        name: 'combustível',
        type: TYPES_OF_SUPPLIERS[2]
    },
    {
        id: '11',
        name: 'Manutenção',
        type: TYPES_OF_SUPPLIERS[2]
    },
    {
        id: '12',
        name: 'Seguro',
        type: TYPES_OF_SUPPLIERS[2]
    },
    {
        id: '13',
        name: 'Prestação',
        type: TYPES_OF_SUPPLIERS[2]
    },
    {
        id: '14',
        name: 'Passagem',
        type: TYPES_OF_SUPPLIERS[2]
    },
    {
        id: '14',
        name: 'Passagem',
        type: TYPES_OF_SUPPLIERS[2]
    },
    {
        id: '15',
        name: 'Transporte por Aplicativo',
        type: TYPES_OF_SUPPLIERS[2]
    },
    {
        id: '16',
        name: 'Remédios',
        type: TYPES_OF_SUPPLIERS[3]
    },
    {
        id: '17',
        name: 'Plano de Saúde',
        type: TYPES_OF_SUPPLIERS[3]
    },
    {
        id: '18',
        name: 'Plano Odontológico',
        type: TYPES_OF_SUPPLIERS[3]
    },
    {
        id: '19',
        name: 'Médio Particular',
        type: TYPES_OF_SUPPLIERS[3]
    },
    {
        id: '20',
        name: 'Dentista Particular',
        type: TYPES_OF_SUPPLIERS[3]
    },
    {
        id: '21',
        name: 'Barba/Cabelo',
        type: TYPES_OF_SUPPLIERS[3]
    },
    {
        id: '22',
        name: 'Academia',
        type: TYPES_OF_SUPPLIERS[3]
    },
    {
        id: '22',
        name: 'Assináturas de Streaming',
        type: TYPES_OF_SUPPLIERS[4]
    },
    {
        id: '23',
        name: 'Roupas',
        type: TYPES_OF_SUPPLIERS[4]
    },
    {
        id: '24',
        name: 'Curso',
        type: TYPES_OF_SUPPLIERS[5]
    },
]

interface ITypePaymentMethod {
    id: string;
    name: string;
}

const TYPES_OF_PAYMENT_METHOD: Array<ITypePaymentMethod> = [
    {
        id: '1',
        name: 'Cartão de Crédito'
    },
    {
        id: '2',
        name: 'Debito em Conta'
    },
    {
        id: '3',
        name: 'Boleto Bancário'
    },
    {
        id: '4',
        name: 'PIX'
    }
]


interface IPaymentMethod {
    id: string;
    name: string;
    type: ITypePaymentMethod;
}

const PAYMENT_METHODS: Array<IPaymentMethod> = [
    {
        id: '1',
        name: 'Cartão Físico',
        type: TYPES_OF_PAYMENT_METHOD[0]
    }
];


interface ISupplier {
    id: string;
    name: string;
    category: ISupplierCategory;
    description?: string;
}

const SUPPLIERS: Array<ISupplier> = [
    {
        id: '1',
        name: 'Drogaria Brasil',
        category: SUPPLIER_CATEGORIES.find((category) => category.id === '16'),
        description: 'Nessa Farmácia Costumo Comprar meus rémedios'
    }
];


interface IExpense {
    id: string;
    year: number;
    type: 'FIXED' | 'VARIABLE';
    value: number;
    supplier: ISupplier;
    status: 'PENDING' | 'PAID' | 'CANCELLED' | 'REFUNDED' | 'OVERDUE' | 'EXPIRED' | 'NOT PAID';
    paymentMethod: IPaymentMethod;
    date: Date;
    description?: string;
}

const addExpense = ({
    type,
    year = 2025,
    value,
    supplier_id,
    payment_method_id,
                    }: any) => {}


addExpense({
    type: 'FIXED',
    value: 100,
    months: ['Fevereiro', 'Março', 'Abril'],
    supplier_id: '1',
    payment_method_id: '1',
})