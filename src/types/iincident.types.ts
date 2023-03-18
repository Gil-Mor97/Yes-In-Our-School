export default interface IIncident {
    city: string,
    school: string,
    schoolWorkerName: string,
    schoolWorkerPhone: string,
    schoolWorkerEmail: string,
    dateOfIncident: Date,
    incidentContent: string,
    reporter?: {
        uid: string,
        email: string,
    }
}