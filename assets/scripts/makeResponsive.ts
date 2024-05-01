

import { _decorator, Component, Enum, Node, UITransform } from 'cc';
const { ccclass, property } = _decorator;

enum Modes {
    None,
    FitHorizontal,
    FitVertical,
    FitInside,
    Envelop
}

@ccclass('makeResponsive')
export class makeResponsive extends Component {


    private selectedMode: Modes = Modes.None;

    @property({ type: Enum(Modes) })
    set selectMode(val: Modes) {
        this.selectedMode = val;
        this.updateMode(); 
    }
    get selectMode(): Modes {
        return this.selectedMode;
    }
    

    start() 
    {
        this.updateMode(); 
    }

    updateMode() 
    {
        let childWidth = this.node.getComponent(UITransform).width;
        let childHeight = this.node.getComponent(UITransform).height;
        let parentWidth = this.node.parent.getComponent(UITransform).width;
        let parentHeight = this.node.parent.getComponent(UITransform).height;
        let factorWidth = parentWidth / childWidth;
        let factorHeight = parentHeight / childHeight;
        let factorMin = Math.min(factorWidth, factorHeight);
        let factorMax = Math.max(factorWidth, factorHeight);

        switch (this.selectedMode) {
            case Modes.FitHorizontal:
                this.fitHorizontal(parentWidth , factorWidth );
                break;
            case Modes.FitVertical:
                this.fitVertical(parentHeight , factorHeight);
                break;
            case Modes.FitInside:
                this.fitInside(factorMin);
                break;
            case Modes.Envelop:
                this.envelop(factorMax);
                break;
            default:
                break;
        }
    }

    fitHorizontal(width, factor ) {
        console.log("fit Horizontally => ");
        
        let uiTransform = this.node.getComponent(UITransform);
        uiTransform.width = width;
        uiTransform.height *= factor; 
    }

    fitVertical(height , factor ) {
        console.log("fit vertically => ");

        let uiTransform = this.node.getComponent(UITransform);
        uiTransform.width *= factor; 
        uiTransform.height = height;
    }

    fitInside(factorMin) {
        console.log("fit inside => ");
        
        let uiTransform = this.node.getComponent(UITransform);
        uiTransform.width *= factorMin; 
        uiTransform.height *= factorMin; 
    }

    envelop(factorMax)
    {
        console.log("Envelop  => ");
        

        let uiTransform = this.node.getComponent(UITransform);
        uiTransform.width *= factorMax; 
        uiTransform.height *= factorMax; 
    }

}































