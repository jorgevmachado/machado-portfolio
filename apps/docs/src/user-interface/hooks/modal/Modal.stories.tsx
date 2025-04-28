import * as React from 'react';
import {useState} from "react";

import type {Meta, StoryObj} from '@storybook/react';

import Button from "@repo/ds/components/button/Button";
import ModalProvider from '@repo/ui/hooks/modal/ModalProvider';
import Modal from "@repo/ui/hooks/modal/modal";
import useModal from "@repo/ui/hooks/modal/useModal";


const meta = {
    args: {
        modal: new Modal({
            title: 'Hello Modal',
            body: <h1>Hello World</h1>,
            visibility: false,
        }),
        context: 'primary',
        onCloseFunction: () =>  {}
    },
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
            body: (
                <BodyModal
                    count={count}
                    onClose={() => modal?.close()}
                    onAgree={() => { setCount((prev) => prev + 1)}}
                />
            ),
        }, [count]);

        return (
            <>
                {modal && <ModalProvider modal={modal} />}
                <Child onOpen={() => modal?.open()} />
                <Button
                    type="button"
                    appearance="outline"
                    context="secondary"
                    onClick={() => setCount((prev) => prev + 1)}
                >
                    Add count: {count}
                </Button>
            </>
        );
    }
}