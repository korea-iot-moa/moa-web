import { CSSProperties } from 'react';

export const modalContainer: CSSProperties = {
  textAlign: 'center',
  marginTop: '50px',
};

export const openModalButton: CSSProperties = {
  fontSize: '16px',
  cursor: 'pointer',
};

export const modalOverlay: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const modalContent: CSSProperties = {
  position: 'relative',
  background: 'white',
  padding: '20px',
  maxWidth: '500px',
  width: '100%',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

export const closeModalButton: CSSProperties = {
  marginTop: '20px',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
};
