const mongoose=require('mongoose');
const validator=require('validator');



const jobSchema=new mongoose.Schema({
    jobTitle: {
        type: String,
        required : [true, 'Please enter Job title']
      },
    companyName: {
        type: String,
        required: [true,'Please add company name']
    },
    email:{
        type: String,
        required: [true,'Email is required'],
        validate:{
            validator:(email)=>validator.isEmail(email),
            message:'Enter a valid email address'
        }
    },
    address:{
        type:String,
        required:[true,'Please add an address']
    },
    salary:{
        type: Number,
        required:[true,'Please enter expected salary for this job'],
        min:[1,'Please enter a valid salary']
    },
    positions:{
        type: Number,
        required:[true,'Please enter number of positions'],
        min:[1,'Please enter a valid number of positions']
    },
    jobDescription:{
        type: String,
        required:[true,'Please add a job description'],
        maxlength:[1000,'Job description cannot exceed 1000 characters']
    },
    jobType:{
        type:String,
        required:[true,'Please select job type'],
        enum:{
            values:[
                'Permanent',
                'Temporary',
                'Internship'
            ],
            message:'Please select correct option for job type'
        }
    },
    minEducation:{
        type:String,
        required:[true,'Please select education needed'],
        enum:{
            values:[
                'Bachelors',
                'Masters',
                'PhD'
            ],
            message:'Please select correct option for education'
        }
    },
    industry:{
        type:String,
        required:[true,'Please select industry for this job'],
        enum:{
            values:[
                'Business',
                'Information Technology',
                'Banking',
                'Education',
                'Telecommunication',
                'Other'
            ],
            message:'Please select correct option for industry'
        }
    },
    experience:{
        type:String,
        required:[true,'Please select experience required'],
        enum:{
            values:[
                'No experience',
                '1-2 years',
                '2-5 years',
                'More than 5 years'
            ],
            message:'Please select correct option for experience'
        }
    },
    // applicants:{
    //     type:[Object],
    //     select:false
    // },
    // user:{
    //     type:mongoose.Schema.ObjectId,
    //     required: true
    // },
    // postingDate:{
    //     type:Date,
    //     default: Date.now
    // },
    // lastDate:{
    //     type:Date,
    //     default: new Date().setDate(new Date().getDate()+7)
    // }

})

const Job=mongoose.model('jobs',jobSchema);

module.exports=Job;