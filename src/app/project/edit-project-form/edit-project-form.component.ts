import { Component, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Project } from '../project';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyFormOptions } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { ProjectService } from '../project.service';

const ALL_THEMES = [
  'blue',
  'indigo',
  'purple',
  'deep-purple',
  'light-blue',
  'cyan',
  'teal',
  'green',
  'light-green',
  'indigo',
  'lime',
  'yellow',
  'amber',
  'deep-orange',
  'grey',
  'blue-grey',
  'indigo',
  'indigo',
];
const themeOpts = ALL_THEMES.map((theme) => {
  return {label: theme, value: theme};
});
console.log(themeOpts);


@Component({
  selector: 'edit-project-form',
  templateUrl: './edit-project-form.component.html',
  styleUrls: ['./edit-project-form.component.scss']
})
export class EditProjectFormComponent implements OnInit {
  @Output() save: EventEmitter<Project> = new EventEmitter();
  @Output() cancel: EventEmitter<Project> = new EventEmitter();
  @Input() project: Project | Partial<Project> = {};

  form = new FormGroup({});
  formOptions: FormlyFormOptions = {
    formState: {
      awesomeIsForced: false,
    },
  };
  //
  // title: string;
  // id: string;
  // themeColor: string;
  // isDarkTheme: boolean;
  // cfg: ProjectCfg;
  formCfg: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'input',
      templateOptions: {
        required: true,
        label: 'Title',
      },
    },
    {
      key: 'themeColor',
      type: 'select',
      templateOptions: {
        label: 'Theme Color',
        options: themeOpts,
        valueProp: 'value',
        labelProp: 'label',
        placeholder: 'Theme Color'
      },
    },
    {
      key: 'isDarkTheme',
      type: 'checkbox',
      templateOptions: {
        label: 'Use Dark Theme',
      },
    },
  ];


  constructor(private _projectService: ProjectService) {
  }

  submit() {
    console.log(this.project);

    if (this.project.id) {
      this._projectService.update(this.project.id, this.project);
    } else {
      this._projectService.add(this.project);
    }
    this.save.emit();
  }

  cancelEdit() {
    this.cancel.emit();
  }

  ngOnInit() {
  }

}
