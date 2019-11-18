import { Injectable } from '@angular/core';
import { Inventory } from '../shared/inventory';  // inventory data type interface class
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  inventorysRef: AngularFireList<any>;    // Reference to inventory data list, its an Observable
  inventoryRef: AngularFireObject<any>;   // Reference to inventory object, its an Observable too
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase,
              private firestore: AngularFirestore) { }


   // Create Inventory
   AddInventory(inventory: Inventory) {

    return this.firestore.collection('drugs').add(inventory);
  }

  // Fetch Single inventory Object
  GetInventory(id: string) {
    this.inventoryRef = this.db.object('inventory-list/' + id);
    return this.inventoryRef;
  }

  // Fetch Inventory List
  GetInventoryList() {
    this.inventorysRef = this.db.list('inventory-list');
    return this.inventorysRef;
  }  

  // Update Inventory Object
  UpdateInventory(inventory: Inventory) {
    this.inventoryRef.update({
      brandName: inventory. brandName,
      actIngreName: inventory. actIngreName,
      excipientName: inventory.excipientName,
      actIngreOtherName: inventory.actIngreOtherName,
      actIngreShortName: inventory. actIngreShortName,
      number: inventory.number,
      unit: inventory.unit,
      formula: inventory.formula,
      drugPart: inventory.drugPart,
      color: inventory.color,
      form: inventory.form,
      smell: inventory.smell,
      taste: inventory.taste,
      usage: inventory.usage
    })
  }  

  // Delete Inventory Object
  DeleteInventory(id: string) { 
    this.inventoryRef = this.db.object('inventory-list/'+id);
    this.inventoryRef.remove();
  }
}
