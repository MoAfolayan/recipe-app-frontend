import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { IRecipe } from '../recipe/recipe';
import { RecipeService } from '../recipe/recipe.service';
import { IUser } from '../user/user';
import { UserService } from '../user/user.service';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    user$: Observable<IUser>;
    userRecipes$: Observable<Observable<IRecipe[]>>;
    selectedRecipe: IRecipe;
    recipesToDelete: IRecipe[];

    constructor(
        public auth0Service: AuthService,
        private router: Router,
        private recipeService: RecipeService,
        private userService: UserService,
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.auth0Service.user$
            .pipe(
            // tap(console.log)
        )
            .subscribe();

        this.userRecipes$ = this.getUserRecipes();
    }

    getUserRecipes(): any {
        return this.userService.getUser()
            .pipe(
                // tap(console.log),
                tap((user: IUser) => this.user$ = of(user)),
                mergeMap((user: IUser) => {
                    if (user.id) {
                        console.log(`user id: `, user.id)
                        return this.recipeService.getUserRecipes(user.id);
                    }
                })
            )
    }

    displaySelectedRecipe(event): void {
        this.selectedRecipe = event;
    }

    deleteRecipes(event): void {
        console.log(`delete multiple recipes: `, event);

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: "400px",
            data: {
                title: "Are you sure?",
                message: "You are about to delete these recipes"
            }
        });

        dialogRef.afterClosed().subscribe(dialogResult => {
            console.log(dialogResult);
            if (dialogResult) {
                this.recipeService.deleteRecipes(event)
                    .subscribe();
            }
        });
    }

    editRecipe(event): void {
        if (event) {
            // edit selectedRecipe
        }
    }

    deleteRecipe(event): void {
        if (event) {
            // delete selectedRecipe
        }
    }

    logout() {
        this.auth0Service.logout();
        this.router.navigate(['login']);
    }

}
