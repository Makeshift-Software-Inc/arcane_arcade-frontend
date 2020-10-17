import React from 'react';

import { observer } from 'mobx-react';
import { useStore } from '../../../store';

import Modal from '../../../components/Modals/Modal';
import Header from '../../../components/Modals/Header/Header';

import CompletedOrder from './Completed';
import ActiveOrder from './Active';

import './Modal.scss';

const OrderDetailsModal = () => {
  const {
    user: { selectedOrder, setSelectedOrder },
  } = useStore('auth');

  if (!selectedOrder) return null;

  const close = () => setSelectedOrder(undefined);

  return (
    <Modal blue={selectedOrder.active()}>
      <Header close={close} closeWhite={selectedOrder.active()} />
      <div className="order-details-modal">
        {selectedOrder.completed() ? (
          <CompletedOrder order={selectedOrder} />
        ) : (
          <ActiveOrder order={selectedOrder} />
        )}
      </div>
    </Modal>
  );
};
export default observer(OrderDetailsModal);
