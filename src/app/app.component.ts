import { Component, ViewChild } from '@angular/core';

import { jqxDataTableComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdatatable.ts';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent {
    @ViewChild('myDataTable') myDataTable: jqxDataTableComponent;

    rowIndex: number;

    myAddButton: jqwidgets.jqxButton;
    myEditButton: jqwidgets.jqxButton;
    myDeleteButton: jqwidgets.jqxButton;
    myCancelButton: jqwidgets.jqxButton;
    myUpdateButton: jqwidgets.jqxButton;

	getWidth() : any {
		if (document.body.offsetWidth < 850) {
			return '90%';
		}
		
		return 850;
	}

   source: any =
    {
        dataFields: [
         
            { name: 'id', type: 'string' },
            { name: 'title', type: 'string' },
            { name: 'body', type: 'string' },
         
        ],
      
        dataType: 'json',
        id: 'id',
        url: 'https://jsonplaceholder.typicode.com/posts'
    };


    dataAdapter: any = new jqx.dataAdapter(this.source);

    renderToolbar = (toolBar: any): void => {
        let theme = jqx.theme;

        let toTheme = (className: string): string => {
            if (theme == '') return className;
            return className + ' ' + className + '-' + theme;
        }

        // appends buttons to the status bar.
        let container = document.createElement('div');
        let fragment = document.createDocumentFragment();

        container.style.cssText = 'overflow: hidden; position: hidden; height: "100%"; width: "100%"'

        let createButtons = (name: string, cssClass: string): any => {
            this[name] = document.createElement('div');
            this[name].style.cssText = 'padding: 3px; margin: 2px; float: left; border: none'

            let iconDiv = document.createElement('div');
            iconDiv.style.cssText = 'margin: 4px; width: 16px; height: 16px;'
            iconDiv.className = cssClass;

            this[name].appendChild(iconDiv);
            return this[name];
        }

        let buttons = [
            createButtons('addButton', toTheme('jqx-icon-plus')),
            createButtons('editButton', toTheme('jqx-icon-edit')),
            createButtons('deleteButton', toTheme('jqx-icon-delete')),
            createButtons('cancelButton', toTheme('jqx-icon-cancel')),
            createButtons('updateButton', toTheme('jqx-icon-save'))
        ];

        for (let i = 0; i < buttons.length; i++) {
            fragment.appendChild(buttons[i]);
        }

        container.appendChild(fragment)
        toolBar[0].appendChild(container);

        let addButtonOptions: jqwidgets.ButtonOptions =
            {
                theme: 'material', height: 25, width: 25
            }
        let otherButtonsOptions: jqwidgets.ButtonOptions =
            {
                theme: 'material', disabled: true, height: 25, width: 25
            }
        // we use TypeScript way of creating widgets here
        this.myAddButton = jqwidgets.createInstance(buttons[0], 'jqxButton', addButtonOptions);
        this.myEditButton = jqwidgets.createInstance(buttons[1], 'jqxButton', otherButtonsOptions);
        this.myDeleteButton = jqwidgets.createInstance(buttons[2], 'jqxButton', otherButtonsOptions);
        this.myCancelButton = jqwidgets.createInstance(buttons[3], 'jqxButton', otherButtonsOptions);
        this.myUpdateButton = jqwidgets.createInstance(buttons[4], 'jqxButton', otherButtonsOptions);

        let addTooltopOptions: jqwidgets.TooltipOptions =
            {
                theme: 'material', position: 'bottom', content: 'Add'
            }
        let editTooltopOptions: jqwidgets.TooltipOptions =
            {
                theme: 'material', position: 'bottom', content: 'Edit'
            }
        let deleteTooltopOptions: jqwidgets.TooltipOptions =
            {
                theme: 'material', position: 'bottom', content: 'Delete'
            }
        let updateTooltopOptions: jqwidgets.TooltipOptions =
            {
                theme: 'material', position: 'bottom', content: 'Save Changes'
            }
        let cancelTooltopOptions: jqwidgets.TooltipOptions =
            {
                theme: 'material', position: 'bottom', content: 'Cancel'
            }

        let myAddToolTip: jqwidgets.jqxTooltip = jqwidgets.createInstance(buttons[0], 'jqxTooltip', addTooltopOptions);
        let myEditToolTip: jqwidgets.jqxTooltip = jqwidgets.createInstance(buttons[1], 'jqxTooltip', editTooltopOptions);
        let myDeleteToolTip: jqwidgets.jqxTooltip = jqwidgets.createInstance(buttons[2], 'jqxTooltip', deleteTooltopOptions);
        let myCancelToolTip: jqwidgets.jqxTooltip = jqwidgets.createInstance(buttons[3], 'jqxTooltip', cancelTooltopOptions);
        let myUpdateToolTip: jqwidgets.jqxTooltip = jqwidgets.createInstance(buttons[4], 'jqxTooltip', updateTooltopOptions);


        this.myAddButton.addEventHandler('click', (event: any) => {
            if (!this.myAddButton.disabled) {
                //add new empty row.
                this.myDataTable.addRow(null, {}, 'first')
                //select the first row and clear the selection.
                this.myDataTable.clearSelection();
                this.myDataTable.selectRow(0);
                //edit the new row.
                this.myDataTable.beginRowEdit(0);
                this.updateButtons('add');
            }
        });

        this.myEditButton.addEventHandler('click', (event: any) => {
            if (!this.myEditButton.disabled) {
                this.myDataTable.beginRowEdit(this.rowIndex);
                this.updateButtons('edit');
            }
        });

        this.myDeleteButton.addEventHandler('click', (event: any) => {
            if (!this.myDeleteButton.disabled) {
                this.myDataTable.deleteRow(this.rowIndex);
                this.updateButtons('delete');
            }
        });

        this.myCancelButton.addEventHandler('click', (event: any) => {
            if (!this.myCancelButton.disabled) {
                //cancel changes.
                this.myDataTable.endRowEdit(this.rowIndex, true);
            }
        });

        this.myUpdateButton.addEventHandler('click', (event: any) => {
            if (!this.myUpdateButton.disabled) {
                //save changes.
                this.myDataTable.endRowEdit(this.rowIndex, false);
            }
        });
    };

    columns: any[] =
    [
        { text: 'Id', editable: false, dataField: 'id', width: 50 },
        { text: 'Title', dataField: 'title', cellsFormat: 'f', cellsAlign: 'left', align: 'left', width: 200 },
        { text: 'Body', dataField: 'body', cellsFormat: 'f', cellsAlign: 'left', align: 'left', width: 200 },
    ];

    updateButtons(action: string): void {
        switch (action) {
            case 'Select':
                this.myAddButton.setOptions({ disabled: false });
                this.myDeleteButton.setOptions({ disabled: false });
                this.myEditButton.setOptions({ disabled: false });
                this.myCancelButton.setOptions({ disabled: true });
                this.myUpdateButton.setOptions({ disabled: true });
                break;
            case 'Unselect':
                this.myAddButton.setOptions({ disabled: false });
                this.myDeleteButton.setOptions({ disabled: true });
                this.myEditButton.setOptions({ disabled: true });
                this.myCancelButton.setOptions({ disabled: true });
                this.myUpdateButton.setOptions({ disabled: true });
                break;
            case 'Edit':
                this.myAddButton.setOptions({ disabled: true });
                this.myDeleteButton.setOptions({ disabled: true });
                this.myEditButton.setOptions({ disabled: true });
                this.myCancelButton.setOptions({ disabled: false });
                this.myUpdateButton.setOptions({ disabled: false });
                break;
            case 'End Edit':
                this.myAddButton.setOptions({ disabled: false });
                this.myDeleteButton.setOptions({ disabled: false });
                this.myEditButton.setOptions({ disabled: false });
                this.myCancelButton.setOptions({ disabled: true });
                this.myUpdateButton.setOptions({ disabled: true });
                break;
        }
    }

    onRowSelect(event: any): void {
        this.rowIndex = event.args.index;
        this.updateButtons('Select');
    };

    onRowUnselect(event: any): void {
        this.updateButtons('Unselect');
    };

    onRowEndEdit(event: any): void {
        this.updateButtons('End Edit');
    };

    onRowBeginEdit(event: any): void {
        this.updateButtons('Edit');
    };
}

