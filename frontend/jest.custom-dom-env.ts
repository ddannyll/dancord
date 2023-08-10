import JsDomEnv from 'jest-environment-jsdom';
// we need this custom environment to test components using radixui
class CustomEnvironment extends JsDomEnv {

    async setup() {
        await super.setup();
        this.global.DOMRect = class DOMRect {
            bottom=0;
            left=0;
            right=0;
            top=0;
            constructor (public x=0, public y=0, public width=0, public height=0) {}
            static fromRect(other?: DOMRectInit): DOMRect {
                if (other) {
                    return new DOMRect(other.x,other.y,other.width,other.height)
                }
                return new DOMRect()
            }
            toJSON() {
                return JSON.stringify(this)
            }
        }
    }

}

module.exports = CustomEnvironment
