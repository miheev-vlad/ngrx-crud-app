import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { invokeSaveItemAPI } from '../store/items.action';
import { selectItems } from '../store/items.selector';
import {
  AbstractControl,
  FormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  nextItemIndex = 0;
  items$ = this.store.select(selectItems);
  addItemForm: UntypedFormGroup;
  submitted = false;

  constructor(
    private store: Store,
    private router: Router,
    private fb: FormBuilder
  ) {}

  get currentControl(): { [key: string]: AbstractControl } {
    return this.addItemForm.controls;
  }

  ngOnInit(): void {
    this.items$.subscribe((items) => {
      if (items && items.length > 0) {
        this.nextItemIndex = items.length + 1;
      }
    });
    this.addItemForm = this.fb.group({
      id: [this.nextItemIndex],
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      cost: [0, [Validators.required, Validators.min(1)]],
    });
  }

  onCreate() {
    this.submitted = true;
    if (this.addItemForm.invalid) {
      return;
    }
    this.store.dispatch(
      invokeSaveItemAPI({ payload: { ...this.addItemForm.value } })
    );
    this.router.navigate(['/']);
  }
}
