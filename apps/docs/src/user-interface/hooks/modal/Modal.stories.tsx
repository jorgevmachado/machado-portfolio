import * as React from 'react';
import {useState} from "react";

import type {Meta, StoryObj} from '@storybook/react';

import Button from "@repo/ds/components/button/Button";
import ModalProvider from '@repo/ui/hooks/modal/ModalProvider';
import useModal from "@repo/ui/hooks/modal/useModal";

const meta = {
    title: 'User-Interface/Hooks/Modal',
    component: ModalProvider,
    decorators: [
        (Story) => (
            <div style={{ height: '100vh' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof ModalProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

interface BodyModalProps { count: number, onClose: () => void; onAgree: () => void; }
const BodyModal = ({ count, onClose, onAgree }: BodyModalProps) => {
    const [loading, setLoading] = useState(false);

    const asyncTest = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onAgree();
        }, 2000);
    };

    return (
        <div>
            <p>count: {count}</p>

            <div style={{ display: 'grid', gap: 15, gridTemplateColumns: '1fr 1fr' }}>
                <Button fluid appearance="outline" onClick={onClose}>Fechar modal</Button>
                <Button fluid onClick={asyncTest} disabled={loading}>
                    {loading ? 'Carregando...' : 'Salvar'}
                </Button>
            </div>
        </div>
    );
};

interface ChildProps { onOpen: () => void; }
const Child = ({ onOpen }: ChildProps) => {
    return (
        <Button type="button" onClick={onOpen}>Submit</Button>
    );
};

export const Default: Story = {
    args: {},
    render: () => {
        const [count, setCount] = useState(0);
        const [modal] = useModal({
            title: 'Title: ' + count,
            body: <BodyModal
                count={count}
                onClose={() => closeModals()}
                onAgree={() => { addCount(); }}
            />,
        }, [count]);

        const closeModals = () => { modal.close(); };
        const handleOpenModal = () => { modal.open(); };
        const addCount = () => { setCount(count + 1); };

        return (
            <>
                <ModalProvider modal={modal} />
                <Child onOpen={handleOpenModal} />
                <Button
                    type="button"
                    appearance="outline"
                    context="secondary"
                    onClick={addCount}
                >
                    Add count: {count}
                </Button>
            </>
        );
    }
}