(this.webpackJsonp=this.webpackJsonp||[]).push([["payone-payment"],{CXah:function(e,t){e.exports="{% block sw_plugin_list_grid_columns_actions_settings %}\r\n    <template v-if=\"item.composerName === 'payone/shopware'\">\r\n        <sw-context-menu-item :routerLink=\"{ name: 'payone.payment.index' }\">\r\n            {{ $tc('sw-plugin.list.config') }}\r\n        </sw-context-menu-item>\r\n    </template>\r\n\r\n    <template v-else>\r\n        {% parent %}\r\n    </template>\r\n{% endblock %}\r\n"},DMdC:function(e,t,n){},IoYR:function(e,t){const{Application:n}=Shopware,s=Shopware.Classes.ApiService;class a extends s{constructor(e,t,n="payone_payment"){super(e,t,n)}validateApiCredentials(e){const t=this.getBasicHeaders();return this.httpClient.post(`_action/${this.getApiBasePath()}/validate-api-credentials`,{credentials:e},{headers:t}).then(e=>s.handleResponse(e))}}n.addServiceProvider("PayonePaymentApiCredentialsService",e=>{const t=n.getContainer("init");return new a(t.httpClient,e.loginService)})},KBQv:function(e,t){const{Application:n}=Shopware,s=Shopware.Classes.ApiService;class a extends s{constructor(e,t,n="payone"){super(e,t,n)}capturePayment(e){const t=`_action/${this.getApiBasePath()}/capture-payment`;return this.httpClient.post(t,{transaction:e},{headers:this.getBasicHeaders()}).then(e=>s.handleResponse(e))}refundPayment(e){const t=`_action/${this.getApiBasePath()}/refund-payment`;return this.httpClient.post(t,{transaction:e},{headers:this.getBasicHeaders()}).then(e=>s.handleResponse(e))}}n.addServiceProvider("PayonePaymentService",e=>{const t=n.getContainer("init");return new a(t.httpClient,e.loginService)})},Lvox:function(e,t,n){var s=n("DMdC");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);(0,n("SZ7m").default)("3806acf0",s,!0,{})},McCE:function(e,t,n){var s=n("McMq");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);(0,n("SZ7m").default)("f06f327e",s,!0,{})},McMq:function(e,t,n){},NXBA:function(e,t,n){},OPxs:function(e,t,n){"use strict";n.r(t);var s=n("mLM4"),a=n.n(s);n("McCE");const{Component:r,Mixin:i}=Shopware,{Criteria:o}=Shopware.Data;r.register("payone-settings",{template:a.a,mixins:[i.getByName("notification"),i.getByName("sw-inline-snippet")],inject:["PayonePaymentApiCredentialsService"],data:()=>({isLoading:!1,isTesting:!1,isSaveSuccessful:!1,isTestSuccessful:!1,config:{},merchantIdFilled:!1,accountIdFilled:!1,portalIdFilled:!1,portalKeyFilled:!1,showValidationErrors:!1,isSupportModalOpen:!1}),computed:{credentialsMissing:function(){return!(this.merchantIdFilled&&this.accountIdFilled&&this.portalIdFilled&&this.portalKeyFilled)}},metaInfo(){return{title:this.$createTitle()}},methods:{paymentMethodPrefixes:()=>["creditCard","debit","paypal","paypalExpress","payolutionInvoicing","payolutionInstallment","sofort"],saveFinish(){this.isSaveSuccessful=!1},testFinish(){this.isTestSuccessful=!1},onConfigChange(e){this.config=e,this.checkCredentialsFilled(),this.showValidationErrors=!1},checkCredentialsFilled(){this.merchantIdFilled=!!this.getConfigValue("merchantId"),this.accountIdFilled=!!this.getConfigValue("accountId"),this.portalIdFilled=!!this.getConfigValue("portalId"),this.portalKeyFilled=!!this.getConfigValue("portalKey")},getConfigValue(e){const t=this.$refs.systemConfig.actualConfigData.null;return null===this.$refs.systemConfig.currentSalesChannelId?this.config[`PayonePayment.settings.${e}`]:this.config[`PayonePayment.settings.${e}`]||t[`PayonePayment.settings.${e}`]},getPaymentConfigValue(e,t){let n=e.charAt(0).toUpperCase()+e.slice(1);return this.getConfigValue(t+n)||this.getConfigValue(e)},onSave(){this.credentialsMissing?this.showValidationErrors=!0:(this.isSaveSuccessful=!1,this.isLoading=!0,this.$refs.systemConfig.saveAll().then(()=>{this.isLoading=!1,this.isSaveSuccessful=!0}).catch(()=>{this.isLoading=!1}))},onTest(){this.isTesting=!0,this.isTestSuccessful=!1;let e={};this.paymentMethodPrefixes().forEach(t=>{e[t]={merchantId:this.getPaymentConfigValue("merchantId",t),accountId:this.getPaymentConfigValue("accountId",t),portalId:this.getPaymentConfigValue("portalId",t),portalKey:this.getPaymentConfigValue("portalKey",t)}}),this.PayonePaymentApiCredentialsService.validateApiCredentials(e).then(e=>{const t=e.credentialsValid,n=e.errors;if(t)this.createNotificationSuccess({title:this.$tc("payone-payment.settingsForm.titleSuccess"),message:this.$tc("payone-payment.settingsForm.messageTestSuccess")}),this.isTestSuccessful=!0;else for(let e in n)n.hasOwnProperty(e)&&this.createNotificationError({title:this.$tc("payone-payment.settingsForm.titleError"),message:this.$tc("payone-payment.settingsForm.messageTestError."+e)});this.isTesting=!1}).catch(e=>{this.createNotificationError({title:this.$tc("payone-payment.settingsForm.titleError"),message:this.$tc("payone-payment.settingsForm.messageTestError.general")}),this.isTesting=!1})},getBind(e,t){return t!==this.config&&this.onConfigChange(t),this.showValidationErrors&&("PayonePayment.settings.merchantId"!==e.name||this.merchantIdFilled||(e.config.error={code:1,detail:this.$tc("payone-payment.messageNotBlank")}),"PayonePayment.settings.accountId"!==e.name||this.accountIdFilled||(e.config.error={code:1,detail:this.$tc("payone-payment.messageNotBlank")}),"PayonePayment.settings.portalId"!==e.name||this.portalIdFilled||(e.config.error={code:1,detail:this.$tc("payone-payment.messageNotBlank")}),"PayonePayment.settings.portalKey"!==e.name||this.portalKeyFilled||(e.config.error={code:1,detail:this.$tc("payone-payment.messageNotBlank")})),e},getPaymentStatusCriteria(){const e=new o(1,100);return e.addFilter(o.equals("stateMachine.technicalName","order_transaction.state")),e}}});var c=n("jAFz"),l=n.n(c);n("Lvox");const{Component:p,Mixin:d}=Shopware;p.override("sw-order-detail-base",{template:l.a,inject:["PayonePaymentService"],mixins:[d.getByName("notification")],data:()=>({disableButtons:!1}),methods:{isPayonePayment:e=>!!e.customFields&&e.customFields.payone_transaction_id,isCapturePossible(e){return!!e.customFields&&(!this.disableButtons&&e.customFields.payone_allow_capture)},isRefundPossible(e){return!!e.customFields&&(!this.disableButtons&&e.customFields.payone_allow_refund)},hasPayonePayment(e){let t=this,n=!1;return!!e.transactions&&(e.transactions.map((function(e){t.isPayonePayment(e)&&(n=!0)})),n)},captureOrder(e){let t=this;this.isPayonePayment(e)&&(t.disableButtons=!0,this.PayonePaymentService.capturePayment(e.id).then(()=>{this.createNotificationSuccess({title:this.$tc("payone-payment.capture.successTitle"),message:this.$tc("payone-payment.capture.successMessage")}),t.reloadEntityData(),t.disableButtons=!1}).catch(e=>{this.createNotificationError({title:this.$tc("payone-payment.capture.errorTitle"),message:e.response.data.message}),t.disableButtons=!1}))},refundOrder(e){let t=this;this.isPayonePayment(e)&&(t.disableButtons=!0,this.PayonePaymentService.refundPayment(e.id).then(()=>{this.createNotificationSuccess({title:this.$tc("payone-payment.refund.successTitle"),message:this.$tc("payone-payment.refund.successMessage")}),t.reloadEntityData(),t.disableButtons=!1}).catch(e=>{this.createNotificationError({title:this.$tc("payone-payment.refund.errorTitle"),message:e.response.data.message}),t.disableButtons=!1}))}}});var u=n("Yjca"),m=n.n(u);n("d11z");const{Component:y}=Shopware;y.override("sw-settings-index",{template:m.a});var g=n("CXah"),h=n.n(g);const{Component:f}=Shopware;f.override("sw-plugin-list",{template:h.a});var b=n("m1C4"),P=n("eQpg");const{Module:w}=Shopware;w.register("payone-payment",{type:"plugin",name:"PayonePayment",title:"payone-payment.general.mainMenuItemGeneral",description:"payone-payment.general.descriptionTextModule",version:"1.0.0",targetVersion:"1.0.0",icon:"default-action-settings",snippets:{"de-DE":b,"en-GB":P},routeMiddleware(e,t){e(t)},routes:{index:{component:"payone-settings",path:"index",meta:{parentPath:"sw.settings.index"}}}});n("KBQv"),n("IoYR")},Yjca:function(e,t){e.exports='{% block sw_settings_content_card_slot_plugins %}\r\n    {% parent %}\r\n\r\n    <sw-settings-item :label="$tc(\'payone-payment.general.mainMenuItemGeneral\')"\r\n                      :to="{ name: \'payone.payment.index\' }"\r\n                      :backgroundEnabled="false">\r\n        <template #icon>\r\n            \x3c!-- TODO: Image only works in production mode --\x3e\r\n            <img class="sw-settings-index__payone-icon" :src="\'payonepayment/plugin.png\' | asset">\r\n        </template>\r\n    </sw-settings-item>\r\n{% endblock %}\r\n'},d11z:function(e,t,n){var s=n("NXBA");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);(0,n("SZ7m").default)("e7715378",s,!0,{})},eQpg:function(e){e.exports=JSON.parse('{"payone-payment":{"title":"PAYONE","general":{"mainMenuItemGeneral":"PAYONE","descriptionTextModule":"Settings for PAYONE"},"capture":{"buttonTitle":"Capture","successTitle":"PAYONE","successMessage":"Capture processed successfully.","errorTitle":"PAYONE"},"refund":{"buttonTitle":"Refund","successTitle":"PAYONE","successMessage":"Refund processed successfully.","errorTitle":"PAYONE"},"settingsForm":{"save":"Save","test":"Test API Credentials","titleSuccess":"Success","titleError":"Error","messageTestSuccess":"The API credentials were verified successfully.","messageTestError":{"general":"The API credentials could not be verified successfully.","creditCard":"The API credentials for Credit Card are not valid.","debit":"The API credentials for Debit are not valid.","paypalExpress":"The API credentials for PayPal Express are not valid.","paypal":"The API credentials for PayPal are not valid.","payolutionInstallment":"The API credentials for Payolution Installment are not valid.","payolutionInvoicing":"The API credentials for Payolution Invoicing are not valid.","sofort":"The API credentials for SOFORT are not valid."}},"supportModal":{"menuButton":"Support","title":"How Can We Help You?","documentation":{"description":"Read our online manual","button":"Online Manual"},"support":{"description":"Contact our technical support","button":"Tech Support"},"repository":{"description":"Report errors on GitHub","button":"GitHub"}},"messageNotBlank":"This field must not be empty.","txid":"TXID","sequenceNumber":{"label":"Sequence Number","empty":"none"},"transactionState":"State"}}')},jAFz:function(e,t){e.exports='{% block sw_order_detail_delivery_metadata %}\r\n    {% parent %}\r\n\r\n    <template v-if="!isLoading" :isLoading="isLoading">\r\n        <template v-if="hasPayonePayment(order)">\r\n            <sw-card class="sw-order-payone-card" :title="$tc(\'payone-payment.title\')">\r\n                <template v-for="transaction in order.transactions">\r\n                    <template v-if="isPayonePayment(transaction)">\r\n                        <sw-container columns="1fr 1fr">\r\n                            <sw-container>\r\n                                <sw-description-list>\r\n                                    <dt>{{ $tc(\'payone-payment.txid\') }}</dt>\r\n                                    <dd class="sw-order-base__label-sales-channel">{{ transaction.customFields.payone_transaction_id }}</dd>\r\n\r\n                                    <dt>{{ $tc(\'payone-payment.sequenceNumber.label\') }}</dt>\r\n                                    <dd class="sw-order-base__label-sales-channel">\r\n                                        <span v-if="transaction.customFields.payone_sequence_number == -1">\r\n                                            {{ $tc(\'payone-payment.sequenceNumber.empty\') }}\r\n                                        </span>\r\n                                        <span v-else>\r\n                                            {{ transaction.customFields.payone_sequence_number }}\r\n                                        </span>\r\n                                    </dd>\r\n\r\n                                    <dt>{{ $tc(\'payone-payment.transactionState\') }}</dt>\r\n                                    <dd class="sw-order-base__label-sales-channel">{{ transaction.customFields.payone_transaction_state }}</dd>\r\n                                </sw-description-list>\r\n                            </sw-container>\r\n\r\n                            <sw-container gap="30px">\r\n                                <sw-button @click="captureOrder(transaction)" :disabled="!isCapturePossible(transaction)">\r\n                                    {{ $tc(\'payone-payment.capture.buttonTitle\') }}\r\n                                </sw-button>\r\n\r\n                                <sw-button @click="refundOrder(transaction)" :disabled="!isRefundPossible(transaction)">\r\n                                    {{ $tc(\'payone-payment.refund.buttonTitle\') }}\r\n                                </sw-button>\r\n                            </sw-container>\r\n                        </sw-container>\r\n                    </template>\r\n                </template>\r\n            </sw-card>\r\n        </template>\r\n    </template>\r\n{% endblock %}\r\n'},m1C4:function(e){e.exports=JSON.parse('{"payone-payment":{"title":"PAYONE","general":{"mainMenuItemGeneral":"PAYONE","descriptionTextModule":"Einstellungen für PAYONE"},"capture":{"buttonTitle":"Capture","successTitle":"PAYONE","successMessage":"Capture erfolgreich durchgeführt.","errorTitle":"PAYONE"},"refund":{"buttonTitle":"Refund","successTitle":"PAYONE","successMessage":"Refund erfolgreich durchgeführt.","errorTitle":"PAYONE"},"settingsForm":{"save":"Speichern","test":"API-Zugangsdaten testen","titleSuccess":"Erfolg","titleError":"Fehler","messageTestSuccess":"Die API-Zugangsdaten wurden erfolgreich validiert.","messageTestError":{"general":"Die API-Zugangsdaten konnten nicht validiert werden.","creditCard":"Die API-Zugangsdaten für Kreditkarte sind nicht korrekt.","debit":"Die API-Zugangsdaten für Lastschrift sind nicht korrekt.","paypalExpress":"Die API-Zugangsdaten für PayPal Express sind nicht korrekt.","paypal":"Die API-Zugangsdaten für PayPal sind nicht korrekt.","payolutionInstallment":"Die API-Zugangsdaten für Payolution Installment sind nicht korrekt.","payolutionInvoicing":"Die API-Zugangsdaten für Payolution Invoicing sind nicht korrekt.","sofort":"Die API-Zugangsdaten für SOFORT sind nicht korrekt."}},"supportModal":{"menuButton":"Support","title":"Wie können wir Ihnen helfen?","documentation":{"description":"Lesen Sie unsere Online-Dokumentation","button":"Dokumentation"},"support":{"description":"Kontaktieren Sie unseren technischen Support","button":"Technischer Support"},"repository":{"description":"Melden Sie Fehler und Verbesserungen auf GitHub","button":"GitHub"}},"messageNotBlank":"Dieser Wert darf nicht leer sein.","txid":"TXID","sequenceNumber":{"label":"Sequenznummer","empty":"keine"},"transactionState":"Status"}}')},mLM4:function(e,t){e.exports='{% block payone_payment %}\r\n    <sw-page class="payone-payment">\r\n        {% block payone_payment_header %}\r\n            <template #smart-bar-header>\r\n                <h2>\r\n                    {{ $tc(\'sw-settings.index.title\') }}\r\n                    <sw-icon name="small-arrow-medium-right" small></sw-icon>\r\n                    {{ $tc(\'payone-payment.title\') }}\r\n                </h2>\r\n            </template>\r\n        {% endblock %}\r\n\r\n        {% block payone_payment_actions %}\r\n            <template #smart-bar-actions>\r\n                {% block payone_payment_settings_actions_feedback %}\r\n                    <sw-button\r\n                        @click="isSupportModalOpen = true"\r\n                        :disabled="false"\r\n                        variant="ghost"\r\n                        :square="false"\r\n                        :block="false"\r\n                        :isLoading="false">\r\n                        {{ $tc(\'payone-payment.supportModal.menuButton\') }}\r\n                    </sw-button>\r\n                {% endblock %}\r\n\r\n                {% block payone_payment_settings_actions_test %}\r\n                    <sw-button-process @click="onTest"\r\n                       :isLoading="isTesting"\r\n                       :processSuccess="isTestSuccessful"\r\n                       :disabled="credentialsMissing || isLoading">\r\n                        {{ $tc(\'payone-payment.settingsForm.test\') }}\r\n                    </sw-button-process>\r\n                {% endblock %}\r\n\r\n                {% block payone_payment_settings_actions_save %}\r\n                    <sw-button-process\r\n                        class="sw-settings-login-registration__save-action"\r\n                        :isLoading="isLoading"\r\n                        :processSuccess="isSaveSuccessful"\r\n                        :disabled="isLoading || isTesting"\r\n                        variant="primary"\r\n                        @process-finish="saveFinish"\r\n                        @click="onSave">\r\n                        {{ $tc(\'payone-payment.settingsForm.save\') }}\r\n                    </sw-button-process>\r\n                {% endblock %}\r\n            </template>\r\n        {% endblock %}\r\n\r\n        {% block payone_payment_settings_content %}\r\n            <template #content>\r\n                <sw-modal\r\n                    v-if="isSupportModalOpen"\r\n                    @modal-close="isSupportModalOpen = false"\r\n                    :title="$tc(\'payone-payment.supportModal.title\')"\r\n                    class="payone-feedback sw-modal--large">\r\n                    <sw-container columns="1fr 1fr 1fr">\r\n                        <div class="payone-feedback__col">\r\n                            <div class="payone-feedback__icon">\r\n                                <sw-icon name="default-documentation-file" large="true"></sw-icon>\r\n                            </div>\r\n                            <p class="payone-feedback__desc">\r\n                                {{ $tc(\'payone-payment.supportModal.documentation.description\') }}\r\n                            </p>\r\n                            <sw-button\r\n                                :disabled="false"\r\n                                variant="primary"\r\n                                :square="false"\r\n                                :block="false"\r\n                                :isLoading="false"\r\n                                link="https://docs.payone.com/display/public/INT/Shopware+6+Plugin">\r\n                                {{ $tc(\'payone-payment.supportModal.documentation.button\') }}\r\n                            </sw-button>\r\n                        </div>\r\n                        <div class="payone-feedback__col">\r\n                            <div class="payone-feedback__icon">\r\n                                <sw-icon name="default-device-headset" large="true"></sw-icon>\r\n                            </div>\r\n                            <p class="payone-feedback__desc">\r\n                                {{ $tc(\'payone-payment.supportModal.support.description\') }}\r\n                            </p>\r\n                            <sw-button\r\n                                :disabled="false"\r\n                                variant="primary"\r\n                                :square="false"\r\n                                :block="false"\r\n                                :isLoading="false"\r\n                                link="mailto:tech.support@payone.com">\r\n                                {{ $tc(\'payone-payment.supportModal.support.button\') }}\r\n                            </sw-button>\r\n                        </div>\r\n                        <div class="payone-feedback__col">\r\n                            <div class="payone-feedback__icon">\r\n                                <sw-icon name="default-text-code" large="true"></sw-icon>\r\n                            </div>\r\n                            <p class="payone-feedback__desc">\r\n                                {{ $tc(\'payone-payment.supportModal.repository.description\') }}\r\n                            </p>\r\n                            <sw-button\r\n                                :disabled="false"\r\n                                variant="primary"\r\n                                :square="false"\r\n                                :block="false"\r\n                                :isLoading="false"\r\n                                link="https://github.com/PAYONE-GmbH/shopware-6">\r\n                                {{ $tc(\'payone-payment.supportModal.repository.button\') }}\r\n                            </sw-button>\r\n                        </div>\r\n                    </sw-container>\r\n                </sw-modal>\r\n\r\n                <sw-card-view>\r\n                    <sw-system-config\r\n                            ref="systemConfig"\r\n                            salesChannelSwitchable\r\n                            inherit\r\n                            @config-changed="onConfigChange"\r\n                            domain="PayonePayment.settings">\r\n                        <template #card-element="{ element, config }">\r\n                            <sw-form-field-renderer\r\n                                :config="{\r\n                                    componentName: \'sw-entity-single-select\',\r\n                                    label: getInlineSnippet(element.config.label),\r\n                                    entity: \'state_machine_state\',\r\n                                    criteria: getPaymentStatusCriteria(),\r\n                                }"\r\n                                v-bind="getBind(element, config)"\r\n                                v-model="config[element.name]"\r\n                                v-if="element.name.startsWith(\'PayonePayment.settings.paymentStatus\')">\r\n                            </sw-form-field-renderer>\r\n                            <sw-form-field-renderer v-bind="getBind(element, config)"\r\n                                                    v-model="config[element.name]"\r\n                                                    v-else>\r\n                            </sw-form-field-renderer>\r\n                        </template>\r\n                    </sw-system-config>\r\n                </sw-card-view>\r\n            </template>\r\n        {% endblock %}\r\n    </sw-page>\r\n{% endblock %}\r\n'}},[["OPxs","runtime","vendors-node"]]]);