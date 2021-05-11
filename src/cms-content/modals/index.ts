import vulnerabilities from './vulnerabilities.json';
import { Markdown, sanitizeID } from '../utils';

interface Link {
  cta: string;
  url: string;
}

export interface Modal {
  body: Markdown;
  header: string;
  modalId: string;
  links?: Link[];
}

function sanitizeModal(modal: Modal): Modal {
  return {
    ...modal,
    modalId: sanitizeID(modal.modalId),
  };
}

export const vulnerabilitiesModal = sanitizeModal(vulnerabilities) as Modal;
