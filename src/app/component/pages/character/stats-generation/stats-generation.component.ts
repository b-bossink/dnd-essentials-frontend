import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StatisticsGenerationService } from 'src/app/api/statistics-generation.service';


@Component({
  selector: 'app-stats-generation',
  templateUrl: './stats-generation.component.html',
  styleUrls: ['./stats-generation.component.css']
})
export class StatsGenerationComponent implements OnInit {
  strength = { value: 0, bonus: 0, total: 0 };
  dexterity = { value: 0, bonus: 0, total: 0 };
  constitution = { value: 0, bonus: 0, total: 0 };
  intelligence = { value: 0, bonus: 0, total: 0 };
  wisdom = { value: 0, bonus: 0, total: 0 };
  charisma = { value: 0, bonus: 0, total: 0 };
  constructor(@Inject(MAT_DIALOG_DATA) public data: { race: string, http: HttpClient }, public dialogRef: MatDialogRef<StatsGenerationComponent>) {

  }

  ngOnInit(): void {
  }

  onSubmit(value: { strength: number, dexterity: number, constitution: number, intelligence: number, wisdom: number, charisma: number }) {
    this.dialogRef.close({ save: true, stats: value });
  }

  closeWithoutSubmitting() {
    this.dialogRef.close({ save: false });
  }

  async setDice(value: { d20: number, d12: number, d10: number, d8: number, d6: number, d4: number }) {
    const generateBtn = document.getElementById("gen");
    generateBtn?.setAttribute("disabled", '');
    let dice = [];
    for (let i = 0; i < value.d20; i++) {
      dice.push('D20');
    }
    for (let i = 0; i < value.d12; i++) {
      dice.push('D12');
    }
    for (let i = 0; i < value.d10; i++) {
      dice.push('D10');
    }
    for (let i = 0; i < value.d8; i++) {
      dice.push('D8');
    }
    for (let i = 0; i < value.d6; i++) {
      dice.push('D6');
    }
    for (let i = 0; i < value.d4; i++) {
      dice.push('D4');
    }

    let service = new StatisticsGenerationService(this.data.http);
    (await service.generate(this.data.race, dice)).subscribe({
      next: r => {
        this.strength = r.strength;
        this.dexterity = r.dexterity;
        this.constitution = r.constitution;
        this.intelligence = r.strength;
        this.wisdom = r.strength;
        this.charisma = r.strength;
        generateBtn?.removeAttribute("disabled");
      },
      error: err => {
        alert("An error occured: " + err.message);
        generateBtn?.removeAttribute("disabled");
      }
    });

  }
}
