interface EmailsInputProps {
    initialValues?: string[];
    placeholder?: string;
}
interface Email {
    value: string;
    valid: Boolean;
}

enum KeyboardEventCode {
    Enter = 'Enter',
    Comma = ',',
}

enum EmailType {
    all = 'all',
    valid = 'valid',
    invalid = 'invalid',
}

class EmailsInput {
    private emails: Email[];
    private rootElement: HTMLDivElement;
    private containerElement: HTMLDivElement;
    private inputElement: HTMLInputElement;

    private inputPlaceholder: string;

    constructor(element: HTMLDivElement, props: EmailsInputProps = {}) {
        this.rootElement = element;
        this.emails = [];
        this.inputPlaceholder = props.placeholder || 'add more people...';

        this.render();

        if (props.initialValues) {
            props.initialValues.forEach((email) => {
                console.log(email);
                this.add(email);
            });
        }
    }

    // Returns the current emails by valid type. Default type value is valid.
    getEmails(type: EmailType = EmailType.valid): string[] {
        if (type === EmailType.all) {
            return this.emails.map((email) => email.value);
        }

        if (type === EmailType.valid) {
            return this.emails.reduce((res, email) => {
                if (email.valid) {
                    res.push(email.value);
                }
                return res;
            }, []);
        }

        if (type === EmailType.invalid) {
            return this.emails.reduce((res, email) => {
                if (!email.valid) {
                    res.push(email.value);
                }
                return res;
            }, []);
        }
    }

    // Adds a email or emails to the list, then render it into the DOM.
    add(value: string): void {
        value
            .trim()
            .split(',')
            .forEach((email) => {
                if (email.length > 0 && !this.emails.some((item) => item.value === email)) {
                    email = email.trim();

                    const isEmailValid: Boolean = this.isValidEmail(email);
                    const emailElement: HTMLDivElement = this.renderEmailElement(email, isEmailValid);

                    this.emails.push({
                        value: email,
                        valid: isEmailValid,
                    });

                    this.containerElement.insertBefore(emailElement, this.inputElement!);
                    this.containerElement.scrollTop = this.containerElement.scrollHeight;
                }
            });
    }

    // Checks if an email address is valid
    private isValidEmail(email: string): boolean {
        const regex: RegExp = RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
        return regex.test(email);
    }

    // Deletes an email and it's element from the DOM.
    private removeEmailElement(element: HTMLElement, email: string) {
        this.emails = this.emails.filter((item) => item.value !== email);
        this.containerElement.removeChild(element);
    }

    // Render an email element into the DOM.
    private renderEmailElement(email: string, isValid: Boolean): HTMLDivElement {
        // Creates an empty div element for email
        const emailElement = document.createElement('div');
        emailElement.className = `EmailsInput__email${
            isValid ? ' EmailsInput__email--valid' : ' EmailsInput__email--invalid'
        }`;

        // Creates a remove button element for email element
        const removeEmailButton = document.createElement('button');
        removeEmailButton.innerHTML = '&times;';
        removeEmailButton.className = 'EmailsInput__email__remove';

        // Adds eventlistener to remove the email element
        removeEmailButton.addEventListener('click', () => this.removeEmailElement(emailElement, email));

        // Creates an empty div element for email text
        const emailTextElement = document.createElement('div');
        emailTextElement.innerHTML = email;

        emailElement.appendChild(emailTextElement);
        emailElement.appendChild(removeEmailButton);

        return emailElement;
    }

    // Renders an input element that is used for getting emails
    private renderInputElement() {
        this.inputElement = document.createElement('input');
        this.inputElement.setAttribute('type', 'email');
        this.inputElement.setAttribute('multiple', '');
        this.inputElement.setAttribute('placeholder', this.inputPlaceholder);
        this.inputElement.className = 'EmailsInput__input';

        const addEmail = (email: string): void => {
            if (email.length > 0) {
                this.add(email);
                this.inputElement.value = '';
            }
        };

        // Adds email if user input an enter key or comma key to input element
        this.inputElement.addEventListener('keyup', (event: KeyboardEvent) => {
            const key = event.key || event.keyCode;

            if (key === KeyboardEventCode.Enter || key === KeyboardEventCode.Comma) {
                addEmail(this.inputElement.value);
            }
        });

        // Adds email if user paste data into input element
        this.inputElement.addEventListener('paste', (event: ClipboardEvent) => {
            // Stop data actually being pasted into input
            event.stopPropagation();
            event.preventDefault();

            // Get pasted data via clipboard API
            const clipboardData: any = event.clipboardData || (<any>window).clipboardData;
            const value: string = clipboardData.getData('Text');

            addEmail(value);
        });

        // Adds email if user remove focus from input element
        this.inputElement.addEventListener('blur', () => {
            addEmail(this.inputElement.value);
        });

        return this.inputElement;
    }

    // Renders EmailsInput component into the root element
    render() {
        this.containerElement = document.createElement('div');
        this.containerElement.className = 'EmailsInput EmailsInput__content';

        this.containerElement.appendChild(this.renderInputElement());

        this.rootElement.appendChild(this.containerElement);
    }
}

// Exports the EmailsInput API to use without "new" keyword
export default (element: HTMLDivElement, props?: EmailsInputProps) => {
    return new EmailsInput(element, props);
};
