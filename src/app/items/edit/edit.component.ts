import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { Item } from '../store/item.interface';
import { invokeUpdateItemAPI } from '../store/items.action';
import { selectItemById } from '../store/items.selector';
import {
  AbstractControl,
  FormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  editItemForm: UntypedFormGroup;
  submitted = false;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  get currentControl(): { [key: string]: AbstractControl } {
    return this.editItemForm.controls;
  }

  ngOnInit(): void {
    let fetchFormData$ = this.route.paramMap.pipe(
      switchMap((param) => {
        var id = Number(param.get('id'));
        return this.store.select(selectItemById(id));
      })
    );

    fetchFormData$.subscribe((data) => {
      if (data) {
        this.editItemForm = this.fb.group({
          id: [data.id],
          title: [
            data.title,
            [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(50),
            ],
          ],
          description: [
            data.description,
            [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(50),
            ],
          ],
          cost: [data.cost, [Validators.required, Validators.min(1)]],
        });
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  onUpdate() {
    this.submitted = true;
    if (this.editItemForm.invalid) {
      return;
    }
    this.store.dispatch(
      invokeUpdateItemAPI({ payload: { ...this.editItemForm.value } })
    );
    this.router.navigate(['/']);
  }
}
