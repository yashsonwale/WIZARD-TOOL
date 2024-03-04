sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"	
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel, MessageBox) {
        "use strict";

        return Controller.extend("form.controller.wizardForm", {
            onInit: function () {

                var oModel = new JSONModel(sap.ui.require.toUrl("form/localService/MockData/form.json"));

                this.getView().setModel(oModel)
                this._oNavContainer = this.byId("wizardNavContainer");
            
            },
            // / adress line
            onAddAddress: function() {
                var oModel = this.getView().getModel("commondata"),
                    aAddresses = oModel.getProperty("/street-address/addresses");
               
                if (aAddresses.length <=2) {
                //     var a=this.byId("idcustomlistitem");
                // var oInput = new sap.m.Text({
                //     text:"address" + " " + aAddresses.length
                //   });
                //   a.addContent(oInput);
 
                    aAddresses.push({Address:""});
                    oModel.setProperty("/street-address/addresses", aAddresses);
                }
                if(aAddresses.length === 3) {
                    oModel.setProperty("/street-address/addAdddressEnabled", false);
                }
            },
            onItemDelete: function(oEvent) {
                var aAddresses = this._getProperty("street-address/addresses"),
                    sPath = oEvent.getParameter("listItem").getBindingContextPath(),
                    sIndex = sPath.substring(sPath.lastIndexOf("/") + 1);
               
                // delete aAddresses[sIndex];
                aAddresses.splice(sIndex, 1);
                this._setProperty("street-address/addresses", aAddresses);
                this._setProperty("street-address/addAdddressEnabled", true)
 
            },
           
            _getModel: function() {
                return this.getView().getModel();
            },
            _getProperty: function(sProperty) {
                return this._getModel().getProperty("/"+ sProperty);
            },
            /**
             * 
             * @param {*} sProperty 
             * @param {*} sValue 
             * @returns 
             */
            _setProperty: function(sProperty, sValue) {
                 this._getModel().setProperty("/"+ sProperty, sValue);
            },


                
            
            onpress: function (){
                
                var oModel = this.getView().getModel();
                  var odata=oModel.getProperty("/")
                oModel.setProperty("/PoBoxAddress/0/Address","")
                oModel.setProperty("/PoBoxAddress/0/Suburb","")
                oModel.setProperty("/PoBoxAddress/0/State","")
                oModel.setProperty("/PoBoxAddress/0/PostCode","")
                oModel.setProperty("/PoBoxAddress/0/Country","")
        
            },
            onClick: function(){
                var oModel = this.getView().getModel();
                
                if(oModel.getProperty("/ContactInformation/0/formVisible")){
                    oModel.setProperty("/ContactInformation/0/secondformVisible",true);
                } else {
                    oModel.setProperty("/ContactInformation/0/formVisible",true);
                }
             
                },
            
            //  for 2  add other contact
            onAdd: function(){
            var oModel = this.getView().getModel();
                
            oModel.setProperty("/ContactInformation/0/secondformVisible",true);

            },
            onDelete: function(){
            var oModel = this.getView().getModel();
             
            oModel.setProperty("/ContactInformation/0/formVisible",false);
           },
           onDeletetwo: function(){
            var oModel = this.getView().getModel();

            oModel.setProperty("/ContactInformation/0/secondformVisible",false)
           },

           CopyRemittance:function(){
            var oModel = this.getView().getModel();

            var sfirstName = oModel.getProperty("/ContactInformation/0/FirstName")
             var sphone = oModel.getProperty("/ContactInformation/0/phone")
             var sEmail =  oModel.getProperty("/ContactInformation/0/Email")
            var sContactpreference = oModel.getProperty("/ContactInformation/0/Contactpreference")
            var slastname = oModel.getProperty("/ContactInformation/0/lastName")
            var mobileno = oModel.getProperty("/ContactInformation/0/MobileNo")
            var sfax = oModel.getProperty("/ContactInformation/0/fax")

            oModel.setProperty("/PurchaseOrderContact/0/PoBox" ,sfirstName)
            oModel.setProperty("/PurchaseOrderContact/0/FirstName" ,sphone)
            oModel.setProperty("/PurchaseOrderContact/0/Email" ,sEmail)
            oModel.setProperty("/PurchaseOrderContact/0/Contactpreference" ,sContactpreference)
            oModel.setProperty("/PurchaseOrderContact/0/lastName" ,slastname)
            oModel.setProperty("/PurchaseOrderContact/0/MobileNo" ,mobileno)
            oModel.setProperty("/PurchaseOrderContact/0/fax" ,sfax)
         
           },
            wizardCompletedHandler: function () {
                this.byId("wizardNavContainer").to(this.byId("wizardReviewPage"));
		
            },
            editHandler: function () {
                this.byId("wizardNavContainer").to(this.byId("wizardContentPage"));
		
            },
            onABN:  function(){
                var oModel =this.getView().getModel();
                 var oData =oModel.getProperty("/SupplierInformation/0/ABN");
  
                if(oData.length<12){
                  oModel.setProperty("/SupplierInformation/0/ABNValueState","Error");
                  oModel.setProperty("/SupplierInformation/0/ABNValueStateText","This is invalid");
              }
             else{
  
                oModel.setProperty("/SupplierInformation/0/ABNValueState","None");
                oModel.setProperty("/SupplierInformation/0/ABNValueStateText","");
            }
          },
          onTrading: function(){
                 var oModel =this.getView().getModel();
                 var osery =oModel.getProperty("/SupplierInformation/0/TradingName");

                 if(osery.length<8){
                    oModel.setProperty("/SupplierInformation/0/TradingNameValueState","Error");
                    oModel.setProperty("/SupplierInformation/0/TradingNameValueStateText","This is invalid");
                }
                else{
                    oModel.setProperty("/SupplierInformation/0/TradingNameValueState","None"); 
                    oModel.setProperty("/SupplierInformation/0/TradingNameValueStateText","");
                     
                }
          },
          onaddress:function(){

            var oModel =this.getView().getModel();
            var oadd =oModel.getProperty("/StreetAddress/0/Address");

            if(oadd.length < 8){
               oModel.setProperty("/StreetAddress/0/AddressValueState","Error");
               oModel.setProperty("/StreetAddress/0/AddressValueStateText","This is invalid");
           }
           else{
               oModel.setProperty("/StreetAddress/0/AddressValueState","None"); 
               oModel.setProperty("/StreetAddress/0/AddressValueStateText","");
               
                    oModel.setProperty("/StreetAddress/0/validate", true);
            //    this._wizard.validated(this.byId("ProducthsType"));
           }
          },
       
          onPayment: function(){
            var oModel =this.getView().getModel();
            var cal =oModel.getProperty("/Paymentterms/0/PaymentTerms");

            if(cal.length < 8){
               oModel.setProperty("/Paymentterms/0/PaymentTermsValueState","Error");
               oModel.setProperty("/Paymentterms/0/PaymentTermsValueStateText","This is invalid");
           }
           else{
               oModel.setProperty("/Paymentterms/0/PaymentTermsValueState","None"); 
               oModel.setProperty("/Paymentterms/0/PaymentTermsValueStateText","");
               
                     oModel.setProperty("/Paymentterms/0/validate", true);

          }

        },
                                    //       adding address line

        // plus: function(){
        //     var oModel =this.getView().getModel();

        //     oModel.setProperty("/lineVisible", true);
        // },  
        onAccount: function(){
            var oModel =this.getView().getModel();
            var cal =oModel.getProperty("/AccountInformation/0/Accountholdername");

            if(cal.length < 8){
               oModel.setProperty("/AccountInformation/0/AccountholdernameValueState","Error");
               oModel.setProperty("/AccountInformation/0/AccountholdernameValueStateText","This is invalid");
           }
           else{
               oModel.setProperty("/AccountInformation/0/AccountholdernameValueState","None"); 
               oModel.setProperty("/AccountInformation/0/AccountholdernameValueStateText","");
               
                     oModel.setProperty("/Paymentterms/0/validate", true);

          }
        },
        onSubmit: function(){
            this._handleMessageBoxOpen("Are you sure you want to Submit your report?", "warning");

        },

                 // submit dialog function
        _handleNavigationToStep: function (iStepNumber) {
			var fnAfterNavigate = function () {
				this._wizard.goToStep(this._wizard.getSteps()[iStepNumber]);
				this._oNavContainer.detachAfterNavigate(fnAfterNavigate);
			}.bind(this);

			this._oNavContainer.attachAfterNavigate(fnAfterNavigate);
			this.backToWizardContent();
		},

        _handleMessageBoxOpen: function (sMessage, sMessageBoxType) {
		 MessageBox[sMessageBoxType](sMessage, {
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function (oAction) {
					if (oAction === MessageBox.Action.YES) {
						this._handleNavigationToStep(0);
						this._wizard.discardProgress(this._wizard.getSteps()[0]);
					}
				}.bind(this)
			});
		},
        handleWizardCancel: function () {
			this._handleMessageBoxOpen("Are you sure you want to cancel your report?", "warning");
		}
       
        

        
          
        });
    });
