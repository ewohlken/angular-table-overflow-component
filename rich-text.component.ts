import { Component, Injector, ElementRef, HostListener } from '@angular/core';

@Component({
    selector: 'ww-rich-text',
    templateUrl: './rich-text.component.html'
})
export class RichTextComponent extends WidgetBase {
    text: string;
    tableContainers: HTMLElement[] = [];

    constructor(
    	private injector: Injector,
    	private el: ElementRef) {
        super(injector);
    }

    ngAfterViewInit() {
    	const tableElements = this.el.nativeElement.querySelectorAll('table');

    	// wrap each table with a table container div
    	tableElements.forEach((tableElement: HTMLTableElement) => {
    		if(!tableElement.classList.contains('unstyled')) {
				let tableContainerElement = document.createElement('div');
	    		tableElement.parentNode.insertBefore(tableContainerElement, tableElement);
	    		tableContainerElement.appendChild(tableElement);
	    		tableContainerElement.classList.add('table-container');
	    		this.tableContainers.push(tableContainerElement);
    		}
    	});
    	
    	setTimeout(() => {
    		this.setOverflowOnTableContainers();
    	})
    }

    @HostListener('window:resize') 
    setOverflowOnTableContainers() {
    	if(this.tableContainers) {
	    	this.tableContainers.forEach((el: HTMLElement) => {
	    		const paddingRight = parseInt(getComputedStyle(el).paddingRight);
	    		el.scrollWidth - paddingRight > el.offsetWidth ? el.classList.add('scrollable')
			 													: el.classList.remove('scrollable');
    		})
    	}
    }
}
