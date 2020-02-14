import { Component, OnInit } from '@angular/core';
import { Resume} from './resume'; //skills,experience,education removed
import { ScriptService } from './script.service';
import { AngularFirestore } from "@angular/fire/firestore";

import { PharmacyReportModel } from "./pharmacy-report-model.model"; // to get the inventory data
import { UserService } from "../core/user.service";
import * as firebase from 'firebase/app';
import { SelectPopupComponent } from "./select-popup/select-popup.component";
import { MatDialog, MatDialogConfig } from "@angular/material";

require('pdfmake/build/pdfmake.js');
require('pdfmake/build/vfs_fonts.js');

declare let pdfMake: any;

@Component({
  selector: 'app-pharmacy-report',
  templateUrl: './pharmacy-report.component.html',
  styleUrls: ['./pharmacy-report.component.scss']
})
export class PharmacyReportComponent {

  name = "sajith";

  resume = new Resume();

  //degrees = ['B.E.', 'M.E.', 'B.Com', 'M.Com'];
  stock: number;
  list: PharmacyReportModel[];
  userEmail: string;
  uidnew;
  constructor(private scriptService: ScriptService, private dialog : MatDialog, private afs: AngularFirestore) {
    

    
    this.uidnew = localStorage.getItem('uid');
    console.log(localStorage.getItem('uid'))
    console.log(this.uidnew) // userid recieved from the service "Users"
    this.resume = JSON.parse(sessionStorage.getItem('resume')) || new Resume();
    // if (!this.resume.experiences || this.resume.experiences.length === 0) {
    //   this.resume.experiences = [];
    //   this.resume.experiences.push(new Experience());
    // }
    // if (!this.resume.educations || this.resume.educations.length === 0) {
    //   this.resume.educations = [];
    //   this.resume.educations.push(new Education());
    // }
    // if (!this.resume.skills || this.resume.skills.length === 0) {
    //   this.resume.skills = [];
    //   this.resume.skills.push(new Skill());
    // }

    console.log('Loading External Scripts');
    this.scriptService.load('pdfMake', 'vfsFonts');
  }

  ngOnInit() {
    this.afs.collection('users').doc(this.uidnew).collection('Inventory').snapshotChanges().subscribe(res => {
      console.log(res)
      this.list = res.map( a=> {
        return{
          id: a.payload.doc.id,
          ...a.payload.doc.data()
        } as unknown as PharmacyReportModel
      }
      )
    })
    console.log("list=> " + this.list)
  }

  // addExperience() {
  //   this.resume.experiences.push(new Experience());
  // }

  // addEducation() {
  //   this.resume.educations.push(new Education());
  // }

  generatePdf(action = 'open') {
    console.log(pdfMake);
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }


  resetForm() {
    this.resume = new Resume();
  }

  getDocumentDefinition() {
    sessionStorage.setItem('resume', JSON.stringify(this.resume));
    return {
      content: [
        {
          text: 'RESUME',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: this.resume.name,
              style: 'name'
            },
            {
              text: this.resume.address
            },
            {
              text: 'Email : ' + this.resume.email,
            },
            {
              text: 'Contant No : ' + this.resume.contactNo,
            },
            {
              text: 'GitHub: ' + this.resume.socialProfile,
              link: this.resume.socialProfile,
              color: 'blue',
            }
            ],
            [
              this.getProfilePicObject()
            ]
          ]
        },
        // {
        //   text: 'Skills',
        //   style: 'header'
        // },
        // {
        //   columns : [
        //     {
        //       ul : [
        //         ...this.resume.skills.filter((value, index) => index % 3 === 0).map(s => s.value)
        //       ]
        //     },
        //     {
        //       ul : [
        //         ...this.resume.skills.filter((value, index) => index % 3 === 1).map(s => s.value)
        //       ]
        //     },
        //     {
        //       ul : [
        //         ...this.resume.skills.filter((value, index) => index % 3 === 2).map(s => s.value)
        //       ]
        //     }
        //   ]
        // },
        // {
        //   text: 'Experience',
        //   style: 'header'
        // },
        // this.getExperienceObject(this.resume.experiences),

        // {
        //   text: 'Education',
        //   style: 'header'
        // },
        //  this.getEducationObject(this.resume.educations),
        //  {
        //    text: 'Other Details',
        //    style: 'header'
        //  },
        //  {
        //    text: this.resume.otherDetails
        //  },
        {
          text: 'Signature',
          style: 'sign'
        },
        {
          columns: [
            { qr: this.resume.name + ', Contact No : ' + this.resume.contactNo, fit: 100 },
            {
              text: `(${this.resume.name})`,
              alignment: 'right',
            }
          ]
        }
      ],
      info: {
        title: this.resume.name + '_RESUME',
        author: this.resume.name,
        subject: 'RESUME',
        keywords: 'RESUME, ONLINE RESUME',
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
        },
        name: {
          fontSize: 16,
          bold: true
        },
        jobTitle: {
          fontSize: 14,
          bold: true,
          italics: true
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
        }
      }
    };
  }

  // getExperienceObject(experiences: Experience[]) {

  //   const exs = [];

  //   experiences.forEach(experience => {
  //     exs.push(
  //       [{
  //         columns: [
  //           [{
  //             text: experience.jobTitle,
  //             style: 'jobTitle'
  //           },
  //           {
  //             text: experience.employer,
  //           },
  //           {
  //             text: experience.jobDescription,
  //           }],
  //           {
  //             text: 'Experience : ' + experience.experience + ' Months',
  //             alignment: 'right'
  //           }
  //         ]
  //       }]
  //     );
  //   });

  //   return {
  //     table: {
  //       widths: ['*'],
  //       body: [
  //         ...exs
  //       ]
  //     }
  //   };
  // }

  // getEducationObject(educations: Education[]) {
  //   return {
  //     table: {
  //       widths: ['*', '*', '*', '*'],
  //       body: [
  //         [{
  //           text: 'Degree',
  //           style: 'tableHeader'
  //         },
  //         {
  //           text: 'College',
  //           style: 'tableHeader'
  //         },
  //         {
  //           text: 'Passing Year',
  //           style: 'tableHeader'
  //         },
  //         {
  //           text: 'Result',
  //           style: 'tableHeader'
  //         },
  //         ],
  //         ...educations.map(ed => {
  //           return [ed.degree, ed.college, ed.passingYear, ed.percentage];
  //         })
  //       ]
  //     }
  //   };
  // }

  getProfilePicObject() {
    if (this.resume.profilePic) {
      return {
        image: this.resume.profilePic,
        width: 75,
        alignment: 'right'
      };
    }
    return null;
  }

  fileChanged(e) {
    const file = e.target.files[0];
    this.getBase64(file);
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.resume.profilePic = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

view(id: string){
  const dialogconfig = new MatDialogConfig;
  dialogconfig.disableClose = true;
  dialogconfig.autoFocus = true;
  dialogconfig.width = "75%";
  dialogconfig.height = "25%";
  dialogconfig.data = {
    id: id,
    abc: this.name,
  }
  this.dialog.open(SelectPopupComponent, dialogconfig);
}




  

}
