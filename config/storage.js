const { Storage } = require('@google-cloud/storage');

const hardcodedCredentials = {
     "type": "service_account",
    "project_id": "sibipedia",
    "private_key_id": "b1cf628a00d2d5b45e5af503d1fdee00c0542d5a",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCckpkCxydXQbYM\nl1wtxjFyx8cwMurC3SxrW4Onlp1T+nWM7A4m9OKAIAqGj2hRCkBx+qWe5UJkC9hj\nagwe3KCJNe3mAHZ36aWnmsiKR4XpIcbWqk+ykQXXGaW2bpTAzSEVnJ0OjjpjOazF\nyubLBkfc49CbvLw7RNvjcRNHRrd5/lWPZbH12o2SUdXPcffEt1WpXEGjzPxf05u8\nehaddED3X0wLlwxAYqyXbs8aXtExOPPOs1GOC9WYiqRrOrOYP2CAUWbDhYxCxvqu\nVBAcoTMAfdryLESqzb33wU47ho8wtK0YmOIQ6zttE5DcsQuNGZQfE+28rI3z/8re\noz5bgMqxAgMBAAECggEAC/sA360K4UrczSOlAOpzuZNez8Nw1WtK4FLqBOzp6e8C\nuqWlwyy+yuYCWCyCyc/g5+r+ORihMJP72uBWjOMxGrHezvG4uIRo0aVu2q6nwpOv\nXTKkxlM0reWMMz4ZfmBtbsCc/4WgVk8nkLtUI80Kh6gcIlnAbED6TSUUWajBr+eV\nYrFMIs9HmiSUbsZNahLyPdY1qkkMaD7eMKfQ7KLZ/pC3UWgBkNZi9qmbfcFGaSfZ\nPZnXok+5O6/oiT6oxhJ3mUzKvtw4g7yya1AbNpxhv7cli9Jbv5F97NRcAuilkCYB\nmMBsbe1ujwSL3tH8bLK9szp8VWcKEfHUCuiDVBeZ1wKBgQDSxjFpfFAEwB4QEHyQ\ntg5Hh6GVAv0SgHEu2R5Sz1NIV2YX75fE3geBLF3qwKJdjIO8xRrh4YIG2YmoWpdK\nzhzIhLBzVrh7K/M6JUb1omJ0lrEWzuGvxuloD2Oq3+NFry6gidnCOjXrWcf8mBBd\nhdlZ988mzIEP4Y7oBI/3QxTCywKBgQC+Kx5sDRRng9YgsuN8D3a/9GzFpeLFk4+x\n0IP/kl75kDgKr7Lbygfdxh6+g6Zb7I1v5PPj7quoEfU0y0br1+QYQfnYzMBGYeAC\n64+XPM6IdXHP/5TpbCHDp1gjUPHtBOG44PTR06Ripl/4F8B8mPWVAivhyoBlHVMr\nrtKusNMs8wKBgQCxLpKTDkFl/OpIrtNIAwL19npKfXyodPiwXSw0iLyF75KPRIXc\npJjCab15ff3/jgOgSEFU6PEZOP2TXLQZ2jIwDfsWuivSvxt0IaoJCzygrZyog7kM\nvrWvGGC8YAD5r04O/lLkB3MUKSEIofv/4mjYTI0DHJ7R7tbnDA7J2MY3CQKBgCRb\nthtOfOI1sJDb4uZrRnb40nsPdkX0KnsCtNn+MC5ixnQ0l2uyOsLKCELAhOP6XChS\ni9a+YQ9nL4yCePLKeg+xPYWX0AMk32FvjCqMM6ifW706zku6otH3gsBtz3NThZyF\nVglv/3Pk/2A9mk24KOvuWFl5EAdFDgvCBwHjSNzFAoGBAIjcZ67S00vJM4D79Dji\nkO5H+tVPMf77RRvLscCWTKYk9Cvp4aOOZWDa5na3vGWLfqHJe8WSc/fQ/Q98nZ8s\n/7L1PTbMHc5XVWQYh3edbWrlwSEaZE8rxVsfzXlaNrnuOVWxKWiRujbw4aFJ/qwB\n1N46ld7mRqfBxIdZBW+NRqjH\n-----END PRIVATE KEY-----\n",
    "client_email": "sibipedia@sibipedia.iam.gserviceaccount.com",
    "client_id": "111908057167395804240",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/sibipedia%40sibipedia.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"

};

const storage = new Storage({
  credentials: hardcodedCredentials,
});

module.exports = storage;
