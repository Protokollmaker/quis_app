export class myArray<T> extends Array<T> {
    defalteElement: T;
    constructor(arraylength: number, defalteElement: T) {
        super(arraylength);
        this.defalteElement = defalteElement;
    }

}