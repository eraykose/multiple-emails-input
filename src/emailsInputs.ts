interface EmailsInputProps {
  initialEmails?: string[];
  placeholder?: string;
}

class EmailsInput {
  private rootElement: HTMLInputElement;

  constructor(element: HTMLInputElement, props: EmailsInputProps = {}) {
    this.rootElement = element;
  }
}

// Exports the EmailsInput API to use without "new" keyword
export default (element: HTMLInputElement, props: EmailsInputProps) => {
  return new EmailsInput(element, props);
};
