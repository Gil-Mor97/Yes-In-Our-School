const localization =  {
    no_schools_found: "לא נמצאו מוסדות במאגר!",
    city: "עיר",
    school: "מוסד",
    no_city_selected: "אנא בחרו עיר קודם!",
    prelude_title: "פרטי המוסד ועובד ההוראה",
    date_and_content_title: "תאריך ופרטי התקרית",
    name_of_school_worker: "שם עובד ההוראה",
    title: "דיווח על עובד הוראה שנפגע",
    phone_of_school_worker_label: "מספר טלפון של עובד ההוראה",
    email_of_school_worker_label: 'כתובת הדוא"ל של עובד ההוראה',
    invalid_email: 'כתובת הדוא"ל שהזנתם לא תקינה, נסו שוב!',
    invalid_phone: "מספר הטלפון לא תקין, נסו שוב!",
    date_of_occurrence_label: "תאריך התקרית",
    content_of_occurrence_label: "פרטי התקרית",
    report_button: "דיווח",
    report_anon_button: "דיווח באנונימיות",
    upload_media: "העלאת מדיה",
    incident_reported_success: "הדיווח נשלח בהצלחה!"
  };

// [1,2,2,3].unique() = [1,2,3]
declare global {
  interface Array<T> {
    unique(): Array<T>;
  }
}
Array.prototype.unique = function () {
  return Array.from(new Set(this));
};



export {localization}