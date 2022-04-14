import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationmessagesService {
  Login_Validation_Message=
  {
    'username': [
      { type: 'required', message: 'User Name is required' },
      { type: 'validLocaluser', message: 'Not matching the Logged User Name'},
      { type: 'pattern', message: 'Numbers or Letters only' },
      { type: 'invalid', message: 'User Name not registered.. Try again.'},
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'validLocaluser', message: 'Not matching the Logged Password'},
      { type: 'pattern', message: 'Numbers or Letters only' },
      { type: 'invalid', message: 'Password not registered.. Try again.'},
    ],
    'new_password': [
      { type: 'required', message: 'New Password is required' },
      { type: 'validLocaluser', message: 'Not matching the Logged New Password'},
      { type: 'pattern', message: 'Numbers or Letters only' },
      { type: 'invalid', message: 'New Password not registered.. Try again.'},
    ]
  };
  Main_Category_Validation_Message=
  {
    'name': [
      { type: 'required', message: 'Name is required' },
      { type: 'validLocaluser', message: 'Not matching the Logged Name'},
      { type: 'pattern', message: 'Numbers or Letters only' },
      { type: 'invalid', message: 'Name not registered.. Try again.'},
    ],
    'arabic_name': [
      { type: 'required', message: 'Arabic Name is required' },
      { type: 'validLocaluser', message: 'Not matching the Logged Arabic Name'},
      { type: 'pattern', message: 'Numbers or Letters only' },
      { type: 'invalid', message: 'Arabic Name not registered.. Try again.'},
    ],
    'image_url':[
      { type: 'required', message: 'Image is required'}
    ],
    'order_column':[
      // {type:'required', message: 'Order is required'}
    ],
    'main_category_id':[
      // {type:'required', message: 'Id is required'}
    ],
    'is_active':[
      // { type: 'required', message: 'Is active is required'}
    ],
    // 'statusContent':[
    //   { type: 'required', message: 'field required'},
    //   { type: 'validContent', message: 'Only accept  " '+localStorage.getItem('erase')+' " ' }
    // ],
    // 'masterrole':[
    //   { type: 'required', message: 'fielde required'}
    // ]
  };
  Sub_Category_Validation_Message=
  {
    'name': [
      { type: 'required', message: 'Name is required' },
      { type: 'validLocaluser', message: 'Not matching the Logged Name'},
      { type: 'pattern', message: 'Numbers or Letters only' },
      { type: 'invalid', message: 'Name not registered.. Try again.'},
    ],
    'arabic_name': [
      { type: 'required', message: 'Arabic Name is required' },
      { type: 'validLocaluser', message: 'Not matching the Logged Arabic Name'},
      { type: 'pattern', message: 'Numbers or Letters only' },
      { type: 'invalid', message: 'Arabic Name not registered.. Try again.'},
    ],
    'image_url':[
      { type: 'required', message: 'Image is required'}
    ],
    'order_column':[
      // {type:'required', message: 'Order is required'}
    ],
    'main_category_id':[
      // {type:'required', message: 'Id is required'}
    ],
    'is_active':[
      // { type: 'required', message: 'Is active is required'}
    ],
    // 'statusContent':[
    //   { type: 'required', message: 'field required'},
    //   { type: 'validContent', message: 'Only accept  " '+localStorage.getItem('erase')+' " ' }
    // ],
    // 'masterrole':[
    //   { type: 'required', message: 'fielde required'}
    // ]
  };
  Business_Validation_Message=
  {
    'name': [
      { type: 'required', message: 'Name is required' },
      { type: 'validLocaluser', message: 'Not matching the Logged Name'},
      { type: 'pattern', message: 'Numbers or Letters only' },
      { type: 'invalid', message: 'Name not registered.. Try again.'},
    ],
    'arabic_name': [
      { type: 'required', message: 'Arabic Name is required' },
      { type: 'validLocaluser', message: 'Not matching the Logged Arabic Name'},
      { type: 'pattern', message: 'Numbers or Letters only' },
      { type: 'invalid', message: 'Arabic Name not registered.. Try again.'},
    ],
    'sub_name': [
      { type: 'required', message: 'Sub Name is required' },
    ],
    'arabic_sub_name': [
      { type: 'required', message: 'Arabic Sub Name is required' },
    ],
    'address': [
      { type: 'required', message: 'Address is required' },
    ],
    'arabic_address': [
      { type: 'required', message: 'Arabic Address is required' },
    ],
    'mapingname': [
      { type: 'required', message: 'Location Name is required' },
    ],
    'latitude': [
      { type: 'required', message: 'Latitude is required' },
    ],
    'longitude': [
      { type: 'required', message: 'Longitude is required' },
    ],
    'phone_number': [
      { type: 'required', message: 'Phone Number is required' },
    ],
    'alt_phone_number': [
      { type: 'required', message: 'Alternate Phone Number is required' },
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
    ],
    'slug': [
      { type: 'required', message: 'Slug is required' },
    ],
    'rating': [
      { type: 'required', message: 'Rating is required' },
    ],
    'web': [
      { type: 'required', message: 'Web is required' },
    ],
    'social_media': [
      { type: 'required', message: 'Social Media is required' },
    ],
    'timing': [
      { type: 'required', message: 'Timing is required' },
    ],
    'service_name': [
      { type: 'required', message: 'Service Name is required' },
    ],
    'arabic_service_name': [
      { type: 'required', message: 'Arabic Service Name is required' },
    ],
    'description': [
      { type: 'required', message: 'Description is required' },
    ],
    'arabic_description': [
      { type: 'required', message: 'Arabic Description is required' },
    ],
    
    // 'statusContent':[
    //   { type: 'required', message: 'field required'},
    //   { type: 'validContent', message: 'Only accept  " '+localStorage.getItem('erase')+' " ' }
    // ],
    // 'masterrole':[
    //   { type: 'required', message: 'fielde required'}
    // ]
  };
  notification_validation_message =
  {
    'title': [
      { type: 'required', message: 'Title is required' },
      { type: 'validLocaluser', message: 'Not matching the Logged title'},
      { type: 'pattern', message: 'Numbers or Letters only' },
      { type: 'invalid', message: 'Title not registered.. Try again.'},
    ],
    'body': [
      { type: 'required', message: 'body is required' },
      { type: 'validLocaluser', message: 'Not matching the Logged body'},
      { type: 'pattern', message: 'Numbers or Letters only' },
      { type: 'invalid', message: 'body not registered.. Try again.'},
    ],
    'type':[
      { type: 'required', message: 'Type is required'}
    ],
  }
//   callback_validation_messages = 
//   {
//     'campaign' : [
//       { type : 'required' ,message : 'campaign required'}
//     ],
//     'number': [
//       { type: 'required', message: 'number is required' },
//       { type: 'minlength', message: 'number must be at least 3 characters long' },
//       { type: 'maxlength', message: 'number should be less than 15 characters' },
//       { type: 'pattern', message: 'number permits digits only' }
//     ],
//     'name':[
//       { type : 'required' ,message : 'contact name required'},
//       { type: 'maxlength', message: 'name should be less than 15 characters' },
//       { type: 'pattern', message: 'name permits letters only' }
//     ]

//   }
//   disposition_validation_messages=
//   {
//     'disposition': [
//       { type: 'required', message: 'disposition is required' },
//     ],
//     'contact':[
//       { type: 'required', message: 'contact is required'}
//     ],
//     'comment':[
//       {type:'required', message: 'comment is required'}
//     ]
//   };

// script_validation_messages=
// {
//   'script': [
//     { type: 'required', message: 'required field' }
//   ],
//   'ivr_name': [
//     { type: 'required', message: 'required field' },
//     { type: 'validivrname', message: 'IVR name already added'}
//   ],
//   'transfer':[
//     { type: 'required', message: 'required field'}
//   ],
//   'path':[
//     { type: 'required', message: 'required field'}
//   ]
// };

// Register_Validation_Message =
// {
//   'userscount' : [
//     {type:'required', message:'Set Number of Users'},
//     { type: 'validSlider', message: 'Should be 2 to 100 at a time' },
//     { type: 'pattern', message: 'Permits digits only' },
//   ],
//   'username': [
//     { type: 'required', message: 'Username is required' },
//     { type: 'minlength', message: 'Username must be at least 3 characters long' },
//     { type: 'maxlength', message: 'Username cannot be more than 10 characters long' },
//     { type: 'pattern', message: 'Your username contains numbers or letters only' },
//     { type: 'validUsername', message: 'Your username has already been taken' }
//   ],
//   'Profilename':[
//     { type:'required', message: 'Profilen name required'},
//     { type: 'pattern', message: 'letters and digits only' }
//   ],
//   'email': [
//     { type: 'required', message: 'Email is required' },
//     { type: 'pattern', message: 'Enter a valid email' }
//   ],
//   'currentpassword':[
//     {type:'required', message: 'Current Password required'}
//   ],
//   'password': [
//     { type: 'required', message: 'Password is required'},
//     { type: 'minlength', message: 'Password must be at least 4 characters long' },
//     { type: 'maxlength', message: 'Password cannot be more than 15 characters long' },
//     { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
//   ],
//   'confirm_password': [
//     { type: 'required', message: 'Confirm password is required' },
//     { type: 'areEqual', message: 'Password mismatch' }
//   ],
//   'role':[
//     {type: 'required', message: 'Role required'},
//     {type: 'exceed', message: 'Wallboard Agent Exceed'}
//   ],
//   'skill':[
//     {type: 'required', message: 'Select the Skills You have!'}
//   ],
//   'terms': [
//     { type: 'pattern', message: 'You must accept terms and conditions' }
//   ],
//   'masterrole':[
//     {type: 'required', message: 'master-role required'}
//   ],
//   'campaign':[
//     {type:'required', message:'campaign required'}
//   ],

//   'phonetype':[
//     {type:'required', message:'Phone-type required'}
//   ],
//   'regpassword':[
//     { type:'required', message:'Reg-Password required'},
//     { type: 'minlength', message: 'Password must be at least 5 characters long' },
//     { type: 'maxlength', message: 'Password cannot be more than 25 characters long' },
//     { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
//   ],
//   'pin':[
//     { type:'required', message:'Reg-Pin required'},
//     { type: 'minlength', message: 'Pin must be at least 4 characters long' },
//     { type: 'maxlength', message: 'Pin cannot be more than 25 characters long' },
//     { type: 'pattern', message: 'Only Number allowed in PIN' }
//   ],
//   'macid':[
//     { type:'required', message:'Mac-id required'},
//     { type: 'pattern', message: 'Invalid Mac-id' }
//   ],
//   'mobile':[
//     { type: 'pattern', message: 'Invalid Mobile Number' },
//     { type: 'minlength', message: 'Number must be at least 3 characters long' },
//     { type: 'maxlength', message: 'Number cannot be more than 15 characters long' }
//   ],
  
//   // campaign
//   'campaignname': [
//     { type: 'required', message: 'campaignname is required' },
//     { type: 'minlength', message: 'Minimum 4 characters' },
//     { type: 'maxlength', message: 'Not more than 15 characters' },
//     { type: 'pattern', message: 'Letters only' },
//     { type: 'validCampaignname', message: 'unknown Campaign not allowed' },
//     { type: 'invalidCampaignname', message: 'Campaign not allowed with same Name' }
//   ],
//    'campaignid': [
//     { type: 'required', message: 'ID is required' }
//   ],
//   'campaigndirection':[
//     {type:'required', message: 'Direction is required'}
//   ],
//   'campaignstatus':[
//     {type:'required', message: 'Status is required'}
//   ],
//   'basicscript':[
//     {type:'required', message: 'Script required'}
//   ],
//   'CampaignsSelected':[
//     {type:'required', message: 'Select the Campaigns'}
//   ],
//   'campaignurl':[
//     {type:'required', message: 'url  required'},
//     {type: 'pattern', message: 'Invalid URL' },
//   ],
//   'callingmode':[
//     {type:'required', message: 'Mode required'}
//   ],
//   'audiopath':[
//     {type:'required',message:'Audio Path Required'}
//   ],
//   'campaignpriority':[
//     {type:'required', message:'Set Priority'},
//     { type: 'validSlider', message: 'Enter a value between 0-100' }
//   ],
//   'maxline':[
//     {type:'required', message:'Set Max Line'},
//     { type: 'validSlider', message: 'Enter a value between 0-1000' }
//   ],
//   'initialcall':[
//     {type:'required', message:'Set Initial Call'},
//     { type: 'validSlider', message: 'Enter a value between 0-10' }
//   ],
//   'statisticssample':[
//     {type:'required', message:'Set Statistics'},
//     { type: 'validSlider', message: 'Enter a value between 0-100' }
//   ],
//   'max_time_recycle':[
//     {type:'required', message:'Set Max Time to Recycle'},
//     { type: 'validSlider', message: 'Enter a value between 0-100' }
//   ],
//   'min_minutes':[
//     {type:'required', message:'Set Min Minutes before next Dial'},
//     { type: 'validSlider', message: 'Enter a value between 0-60' }
//   ],
//   'per_number':[
//     {type:'required', message:'Value is required'},
//     { type: 'validSlider', message: 'Enter a value between 0-50' }
//   ],
//   'per_record':[
//     {type:'required', message:'Value is required'},
//     { type: 'validSlider', message: 'Enter a value between 0-50' }
//   ],
//   'per_day':[
//     {type:'required', message:'Value is required'},
//     { type: 'validSlider', message: 'Enter a value between 0-50' }
//   ],
//   'max_attempt':[
//     {type:'required', message:'Value is required'},
//   ],
//   'followup_status':[
//     {type:'required', message:'Value is required'},
//   ],
//   'disposition':[
//     {type:'required', message:'Value is required'},
//   ],
//   'time_interval':[
//     {type:'required', message:'Value is required'},
//     { type: 'validSlider', message: 'Enter a value between 0-100' }
//   ],
//   'no_of_calls':[
//     {type:'required', message:'Value is required'},
//     { type: 'validSlider', message: 'Enter a value between 0-100' }
//   ],
//   'wait_time':[
//     {type:'required', message:'Value is required'},
//     { type: 'validSlider', message: 'Enter a value between 0-100' }
//   ],
//   'abandon_type':[
//     {type:'required', message:'Value is required'},
//   ],
//   'abandon_rate':[
//     {type:'required', message:'Value is required'},
//     { type: 'validSlider', message: 'Enter a value between 0-100' }
//   ],
//   'abandon_calc_method':[
//     {type:'required', message:'Value is required'},
//   ],
//   'abandon_auto_pace':[
//     {type:'required', message:'Value is required'},
//     { type: 'validSlider', message: 'Enter a value between 0-100' }
//   ],
//   'remote_hang_up':[
//     {type:'required', message:'Value is required'},
//   ],
//   'remote_hang_up_sec':[
//     {type:'required', message:'Value is required'},
//     { type: 'validSlider', message: 'Enter a value between 0-100' }
//   ],
//   'system_hang_up':[
//     {type:'required', message:'Value is required'},
//   ],
//   'no_available':[
//     {type:'required', message:'Value is required'},
//   ],
//   'no_available_sec':[
//     {type:'required', message:'Value is required'},
//     { type: 'validSlider', message: 'Enter a value between 0-100' }
//   ],
//   'acd_avail_time_interval':[
//     {type:'required', message:'Value is required'},
//     { type: 'validSlider', message: 'Enter a value between 0-100' }
//   ],
//   'acd_priority_level':[
//     {type:'required', message:'Value is required'},
//     { type: 'validSlider', message: 'Enter a value between 0-100' }
//   ],
//   'acd_weight_skill':[
//     {type:'required', message:'Value is required'},
//     { type: 'validSlider', message: 'Enter a value between 0-100' }
//   ],
//   'acd_weight_priority':[
//     {type:'required', message:'Value is required'},
//     { type: 'validSlider', message: 'Enter a value between 0-100' }
//   ],
//   'acd_time_queue':[
//     {type:'required', message:'Value is required'},
//     { type: 'validSlider', message: 'Enter a value between 0-100' }
//   ],
//   'acd_time_system':[
//     {type:'required', message:'Value is required'},
//     { type: 'validSlider', message: 'Enter a value between 0-100' }
//   ],
//   'agent_skill_level':[
//     {type:'required', message:'Value is required'},
//     { type: 'validSlider', message: 'Enter a value between 0-100' }
//   ],
//   'agent_cost':[
//     {type:'required', message:'Value is required'},
//     { type: 'validSlider', message: 'Enter a value between 0-100' }
//   ],
//   'agent_available_time':[
//     {type:'required', message:'Value is required'},
//     { type: 'validSlider', message: 'Enter a value between 0-100' }
//   ],
//   'toppings':[
//     {type:'required', message:'Value is required'},
//   ],
//   'file':[
//     {type:'required', message:'Value is required'},
//   ]
// }
  constructor() { }
}
