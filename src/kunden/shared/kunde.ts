/*
 * Copyright (C) 2015 - 2016 Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// import * as _ from 'lodash';
// https://github.com/urish/angular2-moment/blob/master/TimeAgoPipe.ts
// https://github.com/felixge/node-dateformat
// Moment exportiert den Namespace moment und die gleichnamige Function:
//
// http://stackoverflow.com/questions/35254524/using-moment-js-in-angular-2-typescript-application#answer-35255412
import * as moment_ from 'moment';
import {Moment} from 'moment';

import {isBlank, isEmpty, isPresent} from '../../shared';

import {Adresse} from './adresse';
import {Umsatz} from './umsatz';

<<<<<<< HEAD
import {isBlank, /* isEmpty,*/ isPresent} from '../../shared';
=======
>>>>>>> master

// const MIN_RATING: number = 0;
// const MAX_RATING: number = 5;
const moment: (date: string) => Moment = (<any>moment_)['default'];

// declare type Verlag = 'IWI_VERLAG' | 'HSKA_VERLAG';
// declare type BuchArt = 'KINDLE' | 'DRUCKAUSGABE';

/**
 * Gemeinsame Datenfelder unabh&auml;ngig, ob die Kundendaten von einem Server
 * (z.B. RESTful Web Service) oder von einem Formular kommen.
 */
export interface KundeShared {
    _id?: string;
    nachname?: string|undefined;
    email: string|undefined;
    newsletter: boolean|undefined;
    geburtsdatum: string|undefined;
    umsatz?: Umsatz;
    homepage: string|undefined;
    geschlecht: string|undefined;
    username: string|undefined;
    interessen?: Array<string>|undefined;
    adresse?: Adresse;
}

/**
 * Daten vom und zum REST-Server:
 * <ul>
 *  <li> Arrays f&uuml;r mehrere Werte, die in einem Formular als Checkbox
 *       dargestellt werden.
 *  <li> Daten mit Zahlen als Datentyp, die in einem Formular nur als
 *       String handhabbar sind.
 * </ul>
 */
export interface KundeServer extends KundeShared {
    // rating: number|undefined;
<<<<<<< HEAD
    schlagwoerter?: Array<string>|undefined;
=======
    interessen?: Array<string>|undefined;
    links?: Array<string>;
    _links?: Array<string>;
>>>>>>> master
}

/**
 * Daten aus einem Formular:
 * <ul>
 *  <li> je 1 Control fuer jede Checkbox und
 *  <li> au&szlig;erdem Strings f&uuml;r Eingabefelder f&uuml;r Zahlen.
 * </ul>
 */
export interface KundeForm extends KundeShared {
    // rating: string;
<<<<<<< HEAD
    javascript?: boolean;
    typescript?: boolean;
=======
    // javascript?: boolean;
    // typescript?: boolean;
    S?: boolean;
    R?: boolean;
    L?: boolean;
>>>>>>> master
}

/**
 * Model als Plain-Old-JavaScript-Object (POJO) fuer die Daten *UND*
 * Functions fuer Abfragen und Aenderungen.
 */
export class Kunde {
    // public ratingArray: Array<boolean> = [];

    /**
     * Ein Buch-Objekt mit JSON-Daten erzeugen, die von einem RESTful Web
     * Service kommen.
     * @param buch JSON-Objekt mit Daten vom RESTful Web Server
     * @return Das initialisierte Buch-Objekt
     */
    static fromServer(kundeServer: KundeServer): Kunde {
        let geburtsdatum: moment_.Moment|undefined = undefined;
        let umsatz: Umsatz|undefined = undefined;
        let adresse: Adresse|undefined = undefined;
        if (isPresent(kundeServer.geburtsdatum)) {
            const tmp: string = kundeServer.geburtsdatum as string;
            geburtsdatum = moment(tmp);
        }

        if (isPresent(kundeServer.umsatz)) {
            let tmp: Umsatz = kundeServer.umsatz as Umsatz;
            console.log('umsatz=', tmp);

            umsatz = new Umsatz(
                (kundeServer.umsatz as Umsatz).betrag,
                (kundeServer.umsatz as Umsatz).waehrung);
        }

        if (isPresent(kundeServer.adresse)) {
            let tmp: Adresse = kundeServer.adresse as Adresse;
            console.log('adresse=', tmp);

            adresse = new Adresse(
                (kundeServer.adresse as Adresse).plz,
                (kundeServer.adresse as Adresse).ort);
        }


        if (kundeServer.links !== undefined) {
            console.log('Links wird aufgerufen');

            var linksObject: Object;

            linksObject = kundeServer.links[0];

            var linksJSON: string = JSON.stringify(linksObject);
            var linksArray: Array<string> = linksJSON.split('/');
            var linksString: string = linksArray[linksArray.length - 1];



            kundeServer._id = linksString.substring(0, linksString.length - 2);
        }

        if (kundeServer._links !== undefined) {
            console.log('_Links wird aufgerufen');

            var _linksObject: Object;

            _linksObject = kundeServer._links;

            var _linksJSON: string = JSON.stringify(_linksObject);

            var _linksJSONParse: any = JSON.parse(_linksJSON);

            var _linksSelfHref: string = _linksJSONParse.self.href;

            var selfLinkGesplittet: Array<string> = _linksSelfHref.split('/');

            kundeServer._id = selfLinkGesplittet[selfLinkGesplittet.length - 1];

            console.log(kundeServer._id);
        }


        const kunde: Kunde = new Kunde(
            kundeServer._id, kundeServer.nachname, kundeServer.email,
<<<<<<< HEAD
            kundeServer.newsletter, kundeServer.geburtsdatum,
            kundeServer.homepage, kundeServer.geschlecht,
            kundeServer.schlagwoerter, kundeServer.username);
=======
            kundeServer.newsletter, geburtsdatum, kundeServer.homepage,
            kundeServer.geschlecht, kundeServer.username,
            kundeServer.interessen, umsatz, adresse);
>>>>>>> master
        console.log('Kunde.fromServer(): kunde=', kunde);
        return kunde;
    }

    /**
     * Ein Buch-Objekt mit JSON-Daten erzeugen, die von einem Formular
     * kommen.
     * @param buch JSON-Objekt mit Daten vom Formular
     * @return Das initialisierte Buch-Objekt
     */
    static fromForm(kundeForm: KundeForm): Kunde {
        const interessen: Array<string> = [];
        if (kundeForm.S) {
            interessen.push('S');
        }
        if (kundeForm.R) {
            interessen.push('R');
        }
        if (kundeForm.L) {
            interessen.push('L');
        }

        const geburtsdatumMoment: Moment|undefined =
            isEmpty(kundeForm.geburtsdatum) ?
            undefined :
            moment(kundeForm.geburtsdatum as string);

<<<<<<< HEAD
    /**
     * Ein Buch-Objekt mit JSON-Daten erzeugen, die von einem Formular
     * kommen.
     * @param buch JSON-Objekt mit Daten vom Formular
     * @return Das initialisierte Buch-Objekt
     */
    static fromForm(kundeForm: KundeForm): Kunde {
        const schlagwoerter: Array<string> = [];
        if (kundeForm.javascript) {
            schlagwoerter.push('JAVASCRIPT');
        }
        if (kundeForm.typescript) {
            schlagwoerter.push('TYPESCRIPT');
        }

        const kunde: Kunde = new Kunde(
            kundeForm._id, kundeForm.nachname, kundeForm.email,
            kundeForm.newsletter, kundeForm.geburtsdatum, kundeForm.homepage,
            kundeForm.geschlecht, schlagwoerter, kundeForm.username);
=======
        const kunde: Kunde = new Kunde(
            kundeForm._id, kundeForm.nachname, kundeForm.email,
            kundeForm.newsletter, geburtsdatumMoment, kundeForm.homepage,
            kundeForm.geschlecht, kundeForm.username);
>>>>>>> master
        console.log('Kunde.fromForm(): kunde=', kunde);
        return kunde;
    }

    // http://momentjs.com
    get datumFormatted(): string|undefined {
        let result: string|undefined = undefined;
        if (isPresent(this.geburtsdatum)) {
            const datum: Moment = this.geburtsdatum as Moment;
            result = datum.format('Do MMM YYYY');
        }
        return result;
    }

    // get datumFromNow(): string|undefined {
    //     let result: string|undefined = undefined;
    //     if (isPresent(this.datum)) {
    //         const datum: Moment = this.datum as Moment;
    //         result = datum.fromNow();
    //     }
    //     return result;
    // }

    /**
     * Abfrage, ob im Buchtitel der angegebene Teilstring enthalten ist.
     * Dabei
     * wird nicht auf Gross-/Kleinschreibung geachtet.
     * @param titel Zu &uuml;berpr&uuml;fender Teilstring
     * @return true, falls der Teilstring im Kundennachnamen enthalten ist. Sonst
     *         false.
     */
    containsNachname(nachname: string): boolean {
        let result: boolean = true;
        if (isPresent(this.nachname)) {
            const tmp: string = this.nachname as string;
            result = tmp.toLowerCase().includes(nachname.toLowerCase());
        }
        return result;
    }

    // /**
    //  * Die Bewertung ("rating") des Buches um 1 erh&ouml;hen
    //  */
    // rateUp(): void {
    //     if (this.rating < MAX_RATING) {
    //         this.rating++;
    //     }
    // }

    // /**
    //  * Die Bewertung ("rating") des Buches um 1 erniedrigen
    //  */
    // rateDown(): void {
    //     if (this.rating > MIN_RATING) {
    //         this.rating--;
    //     }
    // }

    // /**
    //  * Abfrage, ob das Buch dem angegebenen Verlag zugeordnet ist.
    //  * @param verlag der Name des Verlags
    //  * @return true, falls das Buch dem Verlag zugeordnet ist. Sonst false.
    //  */
    // hasVerlag(verlag: string): boolean {
    //     return this.verlag === verlag;
    // }

    // /**
    //  * Aktualisierung der Stammdaten des Buch-Objekts.
    //  * @param titel Der neue Buchtitel
    //  * @param rating Die neue Bewertung
    //  * @param art Die neue Buchart (DRUCKAUSGABE oder KINDLE)
    //  * @param verlag Der neue Verlag
    //  * @param preis Der neue Preis
    //  * @param rabatt Der neue Rabatt
    //  */
    // updateStammdaten(
    //     titel: string, art: BuchArt, verlag: Verlag, rating: number,
    //     datum: Moment|undefined, preis: number|undefined,
    //     rabatt: number|undefined): void {
    //     this.titel = titel;
    //     this.art = art;
    //     this.verlag = verlag;
    //     this.rating = rating;
    //     this.ratingArray = [];
    //     _.times(rating - MIN_RATING, () => this.ratingArray.push(true));
    //     this.datum = datum;
    //     this.preis = preis;
    //     this.rabatt = rabatt;
    // }

    /**
     * Abfrage, ob es zum Buch auch Schlagw&ouml;rter gibt.
     * @return true, falls es mindestens ein Schlagwort gibt. Sonst false.
     */
    hasInteressen(): boolean {
<<<<<<< HEAD
        if (isBlank(this.schlagwoerter)) {
            return false;
        }
        const tmpSchlagwoerter: Array<string> =
            this.schlagwoerter as Array<string>;
        return tmpSchlagwoerter.length !== 0;
=======
        if (isBlank(this.interessen)) {
            return false;
        }
        const tmpInteressen: Array<string> = this.interessen as Array<string>;
        return tmpInteressen.length !== 0;
>>>>>>> master
    }

    /**
     * Abfrage, ob es zum Buch das angegebene Schlagwort gibt.
     * @param schlagwort das zu &uuml;berpr&uuml;fende Schlagwort
     * @return true, falls es das Schlagwort gibt. Sonst false.
     */
<<<<<<< HEAD
    hasInteresse(schlagwort: string): boolean {
        if (isBlank(this.schlagwoerter)) {
            return false;
        }
        const tmpSchlagwoerter: Array<string> =
            this.schlagwoerter as Array<string>;
        return tmpSchlagwoerter.find((s: string) => s === schlagwort)
            !== undefined;
=======
    hasInteresse(interesse: string): boolean {
        if (isBlank(this.interessen)) {
            return false;
        }
        const tmpInteressen: Array<string> = this.interessen as Array<string>;
        return tmpInteressen.find((s: string) => s === interesse) !== undefined;
>>>>>>> master
    }

    /**
     * Aktualisierung der Schlagw&ouml;rter des Buch-Objekts.
     * @param javascript ist das Schlagwort JAVASCRIPT gesetzt
     * @param typescript ist das Schlagwort TYPESCRIPT gesetzt
     */
    updateInteressen(javascript: boolean, typescript: boolean): void {
        this.resetSchlagwoerter();
        if (javascript) {
            this.addSchlagwort('JAVASCRIPT');
        }
        if (typescript) {
            this.addSchlagwort('TYPESCRIPT');
        }
    }

    /**
     * Konvertierung des Kundenobjektes in ein JSON-Objekt f&uuml;r den RESTful
     * Web Service.
     * @return Das JSON-Objekt f&uuml;r den RESTful Web Service
     */
    toJSON(): KundeServer {
        const geburtsdatum: string|undefined = this.geburtsdatum === undefined ?
            undefined :
            this.geburtsdatum.format('YYYY-MM-DD');
        return {
            _id: this._id,
            nachname: this.nachname,
            email: this.email,
            newsletter: this.newsletter,
            geburtsdatum: geburtsdatum,
            homepage: this.homepage,
            geschlecht: this.geschlecht,
<<<<<<< HEAD
            schlagwoerter: this.schlagwoerter,
            username: this.username
=======
            username: this.username,
            interessen: this.interessen
>>>>>>> master
        };
    }

    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    // wird aufgerufen von fromServer() oder von fromForm()
    private constructor(

        public _id: string|undefined, public nachname: string|undefined,
        public email: string|undefined, public newsletter: boolean|undefined,
        public geburtsdatum: Moment|undefined,
        public homepage: string|undefined, public geschlecht: string|undefined,
<<<<<<< HEAD
        public schlagwoerter: Array<string>|undefined,
        public username: string|undefined) {
=======
        public username: string|undefined,
        public interessen?: Array<string>|undefined,
        public umsatz?: Umsatz|undefined, public adresse?: Adresse|undefined) {
>>>>>>> master
        this._id = _id || undefined;
        this.nachname = nachname || undefined;
        this.email = email || undefined;
        this.newsletter = newsletter || undefined;
<<<<<<< HEAD
        this.geburtsdatum = geburtsdatum || undefined;

        if (isBlank(schlagwoerter)) {
            this.schlagwoerter = [];
        } else {
            const tmpSchlagwoerter: Array<string> =
                schlagwoerter as Array<string>;
            this.schlagwoerter = tmpSchlagwoerter;
        }
=======
        this.umsatz = umsatz || undefined;
        this.adresse = adresse || undefined;
        this.geburtsdatum = isPresent(geburtsdatum) ?
            geburtsdatum :
            moment(new Date().toISOString());

        if (isBlank(interessen)) {
            this.interessen = [];
        } else {
            const tmpinteressen: Array<string> = interessen as Array<string>;
            this.interessen = tmpinteressen;
        }

>>>>>>> master
        // _.times(rating - MIN_RATING, () => this.ratingArray.push(true));
        // _.times(MAX_RATING - rating, () => this.ratingArray.push(false));
        this.email = email || undefined;
    }

<<<<<<< HEAD
    private resetSchlagwoerter(): void {
        this.schlagwoerter = [];
    }

    private addSchlagwort(schlagwort: string): void {
        if (isBlank(this.schlagwoerter)) {
            this.schlagwoerter = [];
        }
        const tmpSchlagwoerter: Array<string> =
            this.schlagwoerter as Array<string>;
        tmpSchlagwoerter.push(schlagwort);
    }
=======
    // private resetInteressen(): void {
    //     this.interessen = [];
    // }

    // private addInteresse(interesse: string): void {
    //     if (isBlank(this.interessen)) {
    //         this.interessen = [];
    //     }
    //     const tmpInteressen: Array<string> =
    //         this.interessen as Array<string>;
    //     tmpInteressen.push(interesse);
    // }
>>>>>>> master
}
