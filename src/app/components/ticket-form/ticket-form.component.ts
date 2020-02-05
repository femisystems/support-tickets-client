import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { formMode } from 'src/app/interfaces/forms';
import { ISupportTicket, PriorityType, StatusType } from 'src/app/interfaces/ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { ToastrService } from 'ngx-toastr';
import * as ticketActions from '../../store/ticket.actions';
import { IError, ILoader } from 'src/app/store/ticket.reducer';

interface State {
  tickets: ISupportTicket[],
  errors: IError,
  loader: ILoader
}

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss']
})
export class TicketFormComponent implements OnInit {
  @Input() mode: formMode;
  @Output() success = new EventEmitter();
  _ticket = {
    id: 0,
    title: '',
    description: '',
    priority: 'low',
    status: 'open',
    email: '',
    refersTo: []
  }
  ticketForm: FormGroup;
  errors = {
    required: 'This field is required',
    email: 'Email format is invalid. Ex user@somewhere.com',
    refersError: 'Value cannot be less than 0'
  };
  successMsg = '';
  failureMsg = '';
  savingForm = false;

  constructor(
    private formBuilder: FormBuilder,
    private ticketService: TicketService,
    private toastr: ToastrService,
    private store: Store<State>
  ) {}

  @Input()
  set ticket(value) {
    this._ticket = value;
  }

  get ticket() {
    return this._ticket;
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.ticketForm = this.formBuilder.group({
      title: [this.ticket.title, [Validators.required]],
      description: [this.ticket.description, [Validators.required]],
      priority: [this.ticket.priority, Validators.required],
      status: [this.ticket.status, [Validators.required]],
      email: [this.ticket.email, [Validators.required, Validators.email]],
      refersTo: [this.ticket.refersTo[0] || '', [this.validateRefers.bind(this)]]
    });
  }

  validateRefers(control: AbstractControl): any {
    if (this.ticketForm && control.dirty) {
      if (typeof control.value === 'number' && control.value < 0) {
        return { refersError:  true };
      }
    }
  }

  isDirtyAndInvalid(controlName: string): boolean {
    return this.ticketForm.controls[controlName].invalid && this.ticketForm.controls[controlName].dirty;
  }

  hasError(controlName: string, validator: string) {
    return this.ticketForm.controls[controlName].errors[validator];
  }

  submitDisabled(): boolean {
    return !this.ticketForm.dirty || this.ticketForm.invalid;
  }

  updateTicket(id: number, payload: ISupportTicket) {
    this.store.dispatch(ticketActions.update({ id, payload }))
  }

  createTicket(payload: ISupportTicket) {
    this.store.dispatch(ticketActions.createTicket({ payload: { ...payload } }));
  }

  onSubmit() {
    if (this.ticketForm.dirty && this.ticketForm.valid) {
      this.savingForm = true;
      const form = this.ticketForm.value;
      const formValue = Object.assign({}, form, {
        refersTo: [form.refersTo],
        status: StatusType[form.status.toUpperCase()],
        priority: PriorityType[form.priority.toUpperCase()]
      });

      this.store.dispatch(ticketActions.saving());
      this.mode === formMode.EDIT ? this.updateTicket(this.ticket.id, formValue) : this.createTicket(formValue);
      this.ticketForm.reset();
    }
  }
}
