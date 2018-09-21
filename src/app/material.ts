import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
    exports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule]
})

export class MyMaterialModule { }