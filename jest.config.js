class DataTransfer {
    constructor() {
        this.data = { dragX: '', dragY: '' };
        this.dropEffect = 'none';
        this.effectAllowed = 'all';
        this.files = [];
        this.img = '';
        this.items = [];
        this.types = [];
        this.xOffset = 0;
        this.yOffset = 0;
    }
    clearData() {
        this.data = {};
    }
    getData(format) {
        return this.data[format];
    }
    setData(format, data) {
        this.data[format] = data;
    }
    setDragImage(img, xOffset, yOffset) {
        this.img = img;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
    }
}

module.exports = {
    globals: {
        DataTransfer: DataTransfer,
    },
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
};
