/*
 *   The best practice way of unsubscribing from Observable.subscribe() calls
 *   is to use “takeUntil()” in the pipe before your “subscribe”.
 *
 *   A component that uses observables, or interaction should extend this class and pipe takeUntil in front of the subscription
 *   Doing so will prevent memory leaks from subscriptions that do not get unsubscribed.
 *
 *   Example:
 *
 *   import { Unsubscribe } from 'Shared/unsubscribe.abstract'
 *   class MyClass extends Unsubscribe {
 *     MyInteraction.onEventSubject.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {...})
 *   }
 *
 *   the unsubscribe$ subject automatically gets completed during the components destroy step so it is important to call super if ngOnDestroy is overwritten
 */
import { Subject } from 'rxjs';
import {OnDestroy} from "@angular/core";

export class Unsubscribe implements OnDestroy {
    unsubscribe$ = new Subject<void>();

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

}
