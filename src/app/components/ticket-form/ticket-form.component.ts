import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { formMode } from 'src/app/interfaces/forms';
import { ISupportTicket, PriorityType, StatusType } from 'src/app/interfaces/ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
  ) {
  }

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

  onSubmit() {
    if (this.ticketForm.dirty && this.ticketForm.valid) {
      this.savingForm = true;
      const form = this.ticketForm.value;
      const formValue = Object.assign({}, form, {
        refersTo: [form.refersTo],
        status: StatusType[form.status.toUpperCase()],
        priority: PriorityType[form.priority.toUpperCase()]
      });
      
      if (this.mode === formMode.EDIT) {
        this.ticketService.update(this.ticket.id.toString(), formValue)
          .subscribe(
            response => {
              this.savingForm = false;
              this.toastr.success('Ticket successfully updated!', 'Success');
              setTimeout(() => this.success.emit(true), 3000);
            },
            error => this.toastr.error('The system was unable to update the ticket. Please try again', 'Operation Failed'),
            () => {}
          );
      } else {
        this.ticketService.create(formValue)
          .subscribe(
            response => {
              this.savingForm = false;
              this.toastr.success('Ticket successfully created!', 'Success');
              setTimeout(() => this.success.emit(true), 3000);
            },
            error => this.toastr.error('The system was unable to create a new ticket. Please try again', 'Operation Failed'),
            () => {}
          );
      }
      this.ticketForm.reset();
    }
  }
}
