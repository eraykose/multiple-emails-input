import EmailsInput from './emailsInputs';

describe('EmailsInput Initialize', () => {
    let rootElement: HTMLDivElement;
    let emailsInput: any;

    beforeEach(() => {
        rootElement = document.createElement('div');
        emailsInput = EmailsInput(rootElement, {
            initialValues: ['test@miro.com', 'invalid.email'],
        });
    });

    test('rootElement is converted to emailsInput', () => {
        const contentElement = rootElement.querySelector('.EmailsInput__content');
        const emailElements = contentElement.querySelectorAll('.EmailsInput__email');
        const invalidEmailElements = contentElement.querySelectorAll('.EmailsInput__email--invalid');
        const validEmails = contentElement.querySelectorAll('.EmailsInput__email--valid');
        const emailRemoveElements = contentElement.querySelectorAll('.EmailsInput__email__remove');
        const inputElement = contentElement.querySelector('.EmailsInput__input');

        expect(contentElement).toBeInstanceOf(HTMLDivElement);

        emailElements.forEach((emailElement) => {
            expect(emailElement).toBeInstanceOf(HTMLDivElement);
        });

        invalidEmailElements.forEach((invalidEmailElement) => {
            expect(invalidEmailElement).toBeInstanceOf(HTMLDivElement);
        });

        validEmails.forEach((validEmail) => {
            expect(validEmail).toBeInstanceOf(HTMLDivElement);
        });

        emailRemoveElements.forEach((emailRemoveElement) => {
            expect(emailRemoveElement).toBeInstanceOf(HTMLButtonElement);
        });

        expect(inputElement).toBeInstanceOf(HTMLInputElement);
    });

    test('emailsInput has correct size of email elements', () => {
        const contentElement = rootElement.querySelector('.EmailsInput__content');
        const emailElements = contentElement.querySelectorAll('.EmailsInput__email');
        const invalidEmailElements = contentElement.querySelectorAll('.EmailsInput__email--invalid');
        const validEmails = contentElement.querySelectorAll('.EmailsInput__email--valid');

        expect(emailElements).toBeInstanceOf(NodeList);
        expect(invalidEmailElements).toBeInstanceOf(NodeList);
        expect(validEmails).toBeInstanceOf(NodeList);

        expect(emailElements.length).toEqual(2);
        expect(invalidEmailElements.length).toEqual(1);
        expect(validEmails.length).toEqual(1);
    });
});

describe('emailsInput', () => {
    let rootElement: HTMLDivElement;
    let emailsInput: any;

    beforeEach(() => {
        rootElement = document.createElement('div');
        emailsInput = EmailsInput(rootElement);
    });

    test('can be added emails', () => {
        emailsInput.add('eray@miro.com');
        emailsInput.add('john@miro.com');

        expect(emailsInput.getEmails().length).toEqual(2);
        expect(emailsInput.getEmails()).toEqual(['eray@miro.com', 'john@miro.com']);
    });

    test('can be added invalid emails', () => {
        emailsInput.add('invalid.email');

        expect(emailsInput.getEmails('invalid').length).toEqual(1);
        expect(emailsInput.getEmails('invalid')).toEqual(['invalid.email']);
    });

    test('can be added emails by comma', () => {
        emailsInput.add('eray@miro.com, john@miro.com');

        expect(emailsInput.getEmails().length).toEqual(2);
        expect(emailsInput.getEmails()).toEqual(['eray@miro.com', 'john@miro.com']);
    });

    test('can be added emails by pressing Enter', () => {
        const inputElement = rootElement.querySelector('.EmailsInput__input') as HTMLInputElement;

        inputElement.value = 'eray@miro.com';
        inputElement.dispatchEvent(
            new KeyboardEvent('keyup', {
                key: 'Enter',
            })
        );

        expect(emailsInput.getEmails()).toEqual(['eray@miro.com']);
    });

    test('can be added emails by pressing Comma', () => {
        const inputElement = rootElement.querySelector('.EmailsInput__input') as HTMLInputElement;

        inputElement.value = 'eray@miro.com';
        inputElement.dispatchEvent(
            new KeyboardEvent('keyup', {
                key: ',',
            })
        );

        expect(emailsInput.getEmails()).toEqual(['eray@miro.com']);
    });

    test('can be added emails when input blur', () => {
        const inputElement = rootElement.querySelector('.EmailsInput__input') as HTMLInputElement;

        inputElement.value = 'eray@miro.com';
        inputElement.dispatchEvent(new Event('blur'));

        expect(emailsInput.getEmails()).toEqual(['eray@miro.com']);
    });

    test('can be removed email', () => {
        emailsInput.add('eray@miro.com, john@miro.com');

        expect(emailsInput.getEmails().length).toEqual(2);

        const emailRemoveElements = rootElement.querySelectorAll('.EmailsInput__email__remove');

        expect(emailRemoveElements).toBeInstanceOf(NodeList);

        emailRemoveElements.forEach((emailRemoveElement: HTMLButtonElement) => {
            emailRemoveElement.click();
        });

        expect(emailsInput.getEmails().length).toEqual(0);
    });

    test('getEmails return valid emails by default', () => {
        emailsInput.add('eray@miro.com, john@miro.com, invalid.email');

        expect(emailsInput.getEmails().length).toEqual(2);
        expect(emailsInput.getEmails()).toEqual(['eray@miro.com', 'john@miro.com']);
    });
});
