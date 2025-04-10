import React, { useState } from 'react';

import Button from '@repo/ds/components/button/Button';

import useModal from '@repo/ds/components/modal/useModal';

interface BodyModalProps {
  count: number;
  onClose: () => void;
  onAgree: () => void;
}
function BodyModal({ count, onClose, onAgree }: BodyModalProps) {
  return (
    <div>
      <p>Count: {count}</p>
      <div style={{ display: 'grid', gap: 15, gridTemplateColumns: '1fr 1fr' }}>
        <Button fluid appearance="outline" onClick={onClose}>
          Fechar
        </Button>
        <Button fluid onClick={onAgree}>
          Incrementar
        </Button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { openModal, modal } = useModal();
  const [count, setCount] = useState<number>(0);

  const handleOpenModal = () => {
    openModal({
      title: `Título Modal ${count}`,
      body: (
        <BodyModal
          count={count}
          onClose={() => console.log('Modal fechada')}
          onAgree={() => {
            setCount(count + 1);
            console.log('Ação de salvar definida!');
          }}
        />
      ),
      closeOnEsc: true,
      closeOnOutsideClick: true,
    });
  };

  return (
    <div>
      <Button onClick={handleOpenModal}>Abrir Modal</Button>
      {modal}
    </div>
  );
}
