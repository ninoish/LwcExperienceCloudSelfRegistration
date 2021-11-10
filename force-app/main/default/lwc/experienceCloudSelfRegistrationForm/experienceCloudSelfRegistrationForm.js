import { LightningElement, api } from "lwc";
import selfRegister from "@salesforce/apex/ExperienceCloudSelfRegisterController.selfRegister";
import getExtraFields from "@salesforce/apex/ExperienceCloudSelfRegisterController.getExtraFields";

export default class ExperienceCloudSelfRegistrationForm extends LightningElement {
  @api startUrl;
  @api regConfirmUrl;
  @api firstnameLabel;
  @api lastnameLabel;
  @api emailLabel;
  @api includePassword;
  @api passwordLabel;
  @api passwordConfirmLabel;
  @api registerButtonLabel;
  @api accountId;
  @api extraFieldsFieldSet;

  firstname = "";
  lastname = "";
  email = "";
  password = "";
  confirmPassword = "";
  extraFields = [];

  isRegistering = false;

  get hasError() {
    return false;
  }

  connectedCallback() {
    this.getExtraFields();
  }

  async register() {
    this.isRegistering = true;
    const res = await selfRegister({
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      accountId: this.accountId,
      regConfirmUrl: this.regConfirmUrl,
      extraFields: this.extraFields,
      startUrl: this.startUrl,
      includePassword: this.includePassword
    });
    console.log(res);
    this.isRegistering = false;
  }

  handleInputChange(e) {
    const { name } = e.currentTarget.dataset;
    this[name] = e.currentTarget.value;
  }

  async getExtraFields() {
    this.extraFields = await getExtraFields({
      extraFieldsFieldSet: this.extraFieldsFieldSet
    });
  }
}
