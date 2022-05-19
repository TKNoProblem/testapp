//const combinedObservables = combineLatest([this.hasFeatures, this.hasInvalidFeatures]);
//     combinedObservables
//       .pipe(takeUntil(this.$onDestroy))
//       .subscribe(([hasFeatures, hasInvalidFeatures]) => {
//         this.dataWizardService.tabs[1].nextIsAvailable = hasFeatures && !hasInvalidFeatures;
//       });
//     this.dataWizardService.showError
//       .pipe(filter(Boolean), withLatestFrom(combinedObservables), takeUntil(this.$onDestroy))
//       .subscribe(([, [hasFeatures, hasInvalidFeatures]]) => {
//         this.hasNoFeaturesError = !hasFeatures;
//         this.errorMessage = this.hasNoFeaturesError;
//         this.hasInvalidFeaturesError = hasInvalidFeatures;
//         this.cdr.markForCheck();
//         this.dataWizardService.showError.next(false);
//       });


//get selectedTab$() {
//     return (
//       this.sidebarWizardService.selectedTab$.pipe(
//         filter((value) => value.curr !== DataWizardComponentTypes.Home),
//       ) as Observable<SelectedTab<Exclude<DataWizardComponentTypes, DataWizardComponentTypes.Home>>>
//     ).pipe(distinctUntilChanged((prev, next) => prev?.curr === next?.curr));
//   }
