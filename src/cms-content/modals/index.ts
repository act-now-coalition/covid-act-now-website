import vulnerabilities from './vulnerabilities.json';
import { Markdown, sanitizeID } from '../utils';

export interface Link {
  cta: string;
  url: string;
}

export interface Modal {
  body: Markdown;
  header: string;
  modalId: string;
  links: Link[];
}

function sanitizeModal(modal: Modal): Modal {
  return {
    ...modal,
    links: modal.links || [],
    modalId: sanitizeID(modal.modalId),
  };
}

export const vulnerabilitiesModal = sanitizeModal(vulnerabilities) as Modal;
