export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
};

export type LegalDoc = {
  slug: string;
  title: string;
  effectiveDate?: string;
  description: string;
  intro?: LegalBlock[];
  sections: LegalSection[];
};

export const LEGAL_DOCS: LegalDoc[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    effectiveDate: "December 23, 2025",
    description:
      "How Beeworks Softwares Private Limited collects, uses, and protects personal information on Osfin.",
    intro: [
      {
        type: "p",
        text: 'Beeworks Softwares Private Limited, a company incorporated in accordance with the laws of India having registered office at Flat No 901, Laburnum Park Bldg. A, Magarpatta City, Hadapsar Pune Maharashtra, India Pin 411028 ("Beeworks" or "Our") owns and manages the website "https://osfin.ai/" and our application (collectively referred to as "Platform"). Beeworks values Your privacy and takes responsibilities in relation to your data seriously. Throughout this policy document and on the platform, we will use some terms like "US", "WE", or the "Company", all of these refer to Beeworks Softwares Private Limited. When we say "YOU" or "USER", we refer to YOU, a natural or legal person who may be a visitor or registered User or end user on the Platform, "Your Customer" will mean any customer of Yours.',
      },
    ],
    sections: [
      {
        heading: "Compliance",
        blocks: [
          {
            type: "p",
            text: "This Privacy Policy is published in compliance with inter alia:",
          },
          {
            type: "ul",
            items: [
              "Section 43A of the Information Technology Act, 2000 (\"IT Act\");",
              "Rule 4 of the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (\"SPDI Rules\"); and",
              "Rule 3(1) of the Information Technology (Intermediaries Guidelines) Rules, 2011.",
            ],
          },
          {
            type: "p",
            text: "Beeworks value the trust YOU place in us. That is why Beeworks insists upon the highest standards for secure transactions and customer information privacy. This Privacy Policy applies to the personal information Beeworks collects on the Website and Platform. This Privacy Policy inter alia describes the types of personal information Beeworks collect on the Website and Platform, how Beeworks may use that information and with whom Beeworks may share it. Please read the following statement to learn about OUR information gathering and dissemination practices.",
          },
          {
            type: "p",
            text: "By using the Website, YOU confirm that YOU accept the terms of this Privacy Policy and that YOU agree to abide by them. This Privacy Policy is incorporated into and subject to the terms of use available on the Platform. This policy may be amended from time-to-time. Beeworks privacy policy is subject to change at any time with notice. To make sure YOU are aware of any changes, please review this policy periodically.",
          },
          {
            type: "p",
            text: 'When YOU access the Platform YOU accept, without limitation or qualification, the Privacy Policy set forth below and any additional terms of use set forth in the Platform. This Privacy Policy constitutes a binding legal agreement between YOU and Beeworks. If YOU do not agree to the Privacy Policy, YOU have no right to obtain information from or otherwise continue using the Platform. Failure to use the Platform in accordance with the Privacy Policy may subject YOU to civil and criminal penalties. Beeworks has provided this Privacy Policy to familiarize YOU with the type of data or information that YOU share with or provide to Beeworks and that Beeworks collects from YOU, the purpose for collection of such data or information from YOU, Beeworks information security practices and policies and Beeworks Privacy policy on controlling or processing Your data or information. This Privacy Policy may be amended/updated from time to time. Upon amending/updating the Privacy Policy, Beeworks will accordingly amend the date above. Beeworks suggests that YOU regularly check this Privacy Policy to apprise Yourself of any updates. Your continued use of the Platform or provision of data or information thereafter will imply Your unconditional acceptance of such updates to this Privacy Policy. The information (which shall also include data) provided by YOU to Beeworks or collected from YOU by Beeworks may consist of Personal Information and Non-Personal Information. "Personal Information" is the information YOU submit and that can be used to uniquely identify or contact YOU and "Non-Personal Information" is the de-identified and non-personally identifiable information collected from the Website. This Privacy Policy is a part of the Terms of Use available at /legal/terms-of-service. YOU must read both these documents together.',
          },
        ],
      },
      {
        heading: "Collection of Information",
        blocks: [
          {
            type: "p",
            text: "In order to visit the Beeworks platform, YOU do not need to register with us. But our servers may automatically collect the following information such as:",
          },
          {
            type: "ul",
            items: [
              "Your IP address;",
              "The website from which YOU were referred to our website (e.g. if YOU followed a link);",
              "The webpages YOU are visiting on our website;",
              "The browser YOU are using and its display settings; and",
              "Your operating system.",
            ],
          },
          {
            type: "p",
            text: "For more details on how we use cookies and similar technologies, please see our Cookie Policy.",
          },
        ],
      },
      {
        heading: "Use of Your Information",
        blocks: [
          {
            type: "p",
            text: "We will use your information in one or more of the circumstances below:",
          },
          {
            type: "ul",
            items: [
              "To comply with the legal process nationally or internationally;",
              "To enforce the Terms of Use and this Privacy Policy;",
              "To respond to claims that any content violates the rights of third parties;",
              "To protect the rights, property or personal safety of the Company, its Users and the public;",
              "To provide our services to YOU;",
              "Internal record keeping;",
              "To improve our products and services or provide new products or services;",
              "To send promotional emails or messages about special offers or other information which We think YOU may find interesting;",
              "To possibly customize the website, or our services according to Your interests/requirements;",
              "Resolve disputes that may arise with the use of our services, measure consumer interest in our services, detect and protect Us against error, fraud and other criminal activity;",
              "We identify and use Your IP address to help diagnose problems with our server, and to administer Our Platform;",
              "To identify YOU through Your IP address and to gather broad demographic information;",
              "To do internal research on our users' demographics, interests, and behaviour to better understand, protect and serve our Users. This information is compiled and analysed on an aggregated basis.",
            ],
          },
        ],
      },
      {
        heading: "Disclosure of Information",
        blocks: [
          {
            type: "p",
            text: "Beeworks customer's privacy is extremely important to Beeworks. However, Beeworks may disclose certain information obtained to the following:",
          },
          {
            type: "ul",
            items: [
              "To Beeworks employees, in order to diagnose and resolve any problems or to provide support to YOU.",
              "In the event that Beeworks engage in a merger, acquisition, bankruptcy, dissolution, reorganization, sale of some or all of a part of Beeworks assets or stock, financing, public offering of securities, acquisition of all or a portion of Beeworks business, a similar transaction or proceeding, or steps in contemplation of such activities (such as due diligence), some or all other information may be shared or transferred, subject to standard confidentiality arrangements.",
              "With Beeworks corporate affiliates, parents and/or subsidiaries with respect to other information provided by the customer;",
              "To protect and defend the rights, property or safety of the Company or third parties, including enforcing contracts or policies, or in connection with investigating and preventing fraud or security issues.",
              "If Beeworks is required to do so by law, regulation or legal process, such as a court order or in response to legal requests by government agencies or when Beeworks believe disclosure is necessary or appropriate to prevent physical, financial or other harm, injury or loss or in connection with an investigation of suspected or actual unlawful activity.",
            ],
          },
        ],
      },
      {
        heading: "Storage and Maintenance of Information Collected",
        blocks: [
          {
            type: "p",
            text: "Beeworks access and control the Personal Data provided by YOU. In lieu of the same, Beeworks may store information about YOU, however, Beeworks shall not be obligated to do so and may delete any information and records in whole or in part solely at Beeworks discretion. Beeworks may retain other information pertaining to YOU for as long as necessary for the purposes detailed within this Privacy Policy. Storing such other information provided by YOU shall be retained with Beeworks, on Beeworks servers, for the period of time needed for Beeworks to pursue legitimate business interests, conduct audits, comply with (and demonstrate compliance with) legal obligations, resolve disputes and enforce Beeworks agreements.",
          },
          {
            type: "p",
            text: "Your Communication Preferences: To help Beeworks make emails more useful and informative, Beeworks often receives a confirmation when YOU open an email from Beeworks if Your device supports such capabilities. If YOU do not want to receive e-mail or other mail from Beeworks, YOU may adjust Your customer communication preferences from the Website.",
          },
          {
            type: "p",
            text: "Information from Other Sources: Beeworks might receive information about YOU from other sources and add it to Beeworks account information as may be required to serve YOU better and for Beeworks business enhancement. By using or continuing to use Beeworks Website, YOU agree to Beeworks use of Your information (including sensitive Personal Information, if any) in accordance with this Privacy Policy, as may be amended from time to time by Beeworks at Beeworks discretion. YOU also agree and consent to Beeworks collecting, storing, processing, transferring and sharing information (including sensitive Personal Information) related to YOU with third parties or service providers for the purposes as set out in this Privacy Policy.",
          },
          {
            type: "p",
            text: "Beeworks may be required to share the aforesaid information with government authorities and agencies for the purposes of verification of identity or for prevention, detection or investigation, including cyber incidents, prosecution and punishment of offenses. YOU agree and provide Beeworks consent to disclose Your information, if so required, under applicable law.",
          },
        ],
      },
      {
        heading: "Change in Privacy Policy",
        blocks: [
          {
            type: "p",
            text: "Beeworks reserves the right to update, modify and amend any of the terms of Beeworks Privacy Policy, at any time without prior intimation to YOU. Beeworks shall not be liable for any failure or negligence on your part to review the updated Privacy Policy before accessing or using the Website. Your continued use of the Website, following changes to the Privacy Policy, will constitute your acceptance of those changes.",
          },
        ],
      },
      {
        heading: "Disclaimer",
        blocks: [
          {
            type: "p",
            text: "Beeworks cannot ensure that all of Your Information including Personal Information will never be disclosed in ways not otherwise described in this Privacy Policy. Therefore, although Beeworks is committed to protecting Your privacy, Beeworks does not promise, and YOU should not expect, that Your Information or private communications will always remain private. As a user of the Websites, YOU assume all responsibility and risk for your use of the Website, the internet generally, and the information YOU post or access and for Your conduct on and off the Websites.",
          },
        ],
      },
      {
        heading: "Contact Information",
        blocks: [
          {
            type: "p",
            text: "For any questions or concerns regarding your data, privacy, or this policy, please contact our designated officers.",
          },
          {
            type: "p",
            text: "Grievance Officer / Data Protection Officer. In case of any grievance arising from the use of the platform or for matters related to data subject rights please contact the Chief Information Security Officer:",
          },
          {
            type: "ul",
            items: ["Name: Pavan Rathore", "Email: pavan@osfin.ai"],
          },
          {
            type: "p",
            text: "Redressal Officer. For any complaints or redressal needs, please contact our Redressal Officer.",
          },
          {
            type: "ul",
            items: ["Name: Pavan Rathore", "Email: pavan@osfin.ai"],
          },
          {
            type: "p",
            text: "Consent Manager. To manage your consent preferences, withdraw consent, or for any related queries, please get in touch with our Consent Manager.",
          },
          {
            type: "ul",
            items: ["Name: Pavan Rathore", "Email: pavan@osfin.ai"],
          },
        ],
      },
    ],
  },
  {
    slug: "terms-of-service",
    title: "Terms of Service",
    description:
      "Terms of Use for osfin.ai and the software provided by Beeworks Softwares Private Limited.",
    intro: [
      {
        type: "p",
        text: 'Please read the following Terms of Use ("Terms of Use" or "Terms") of the website osfin.ai ("Website") and the software ("Beeworks"), together, osfin.ai. We will use some terms like "Us", "We", "Our" or the "Company". All of these refer to Osfin.ai. When we say "You" or "User", we refer to you, a natural or legal person who may be a visitor, registered User or end-user on Osfin.ai. "Your Customer" will mean any customer of Yours, the User. Osfin.ai is owned and operated by the Company. Please read the Terms carefully before logging in, or using Osfin.ai in any manner whatsoever.',
      },
      {
        type: "p",
        text: "You will be bound by these Terms and the Privacy Policy available at /legal/privacy-policy when You visit, access or use Osfin.ai. We may update these Terms of Use from time to time and will notify You as and when we do so. Please ensure you read our Terms of Use and any updated version when You use Osfin.ai.",
      },
      {
        type: "p",
        text: 'This document is an electronic record in terms of the Information Technology Act, 2000 ("IT Act"), the rules thereunder as applicable, and the provisions pertaining to electronic records in various statutes as amended by the IT Act. This electronic record is generated by a computer system and does not require any physical or digital signatures.',
      },
    ],
    sections: [
      {
        heading: "1. Acceptance of the Terms",
        blocks: [
          {
            type: "ul",
            items: [
              "These Terms and the Privacy Policy are actually a legal contract between you and us. By logging in, or using Osfin.ai or our services, you agree to be bound by these Terms, the Privacy Policy including any additional guidelines and future modifications. If you don't agree to these Terms, You should not stay on Beeworks or become a recipient of our services.",
              "To accept these Terms, you must be at least 18 (eighteen) years of age. If in your jurisdiction You must be older to form a legally binding commercial contract, you must be such older age. We will assume you are of such valid legal age to accept these Terms.",
              "Because our services are provided to corporate legal entities, you represent and warrant that you are duly authorized to accept these Terms and have the authority to bind your legitimate and registered business entity.",
              "In consideration of your use of Osfin.ai, you agree to provide true, accurate, current and complete information about yourself as prompted on Osfin.ai, and to maintain and promptly update your data to keep it true, accurate, current and complete.",
              "You must provide all information that is accurate and that you are duly authorized to provide. If you provide any information that is untrue, inaccurate, not current or incomplete, or we have reasonable grounds to suspect that such information is untrue, inaccurate, not current or incomplete, we reserve the right to suspend or terminate your account and refuse any and all current or future use of Beeworks (or any portion thereof) at any time.",
              "You will be required to enter a valid phone number and email id while registering for a demo or accessing the product on Osfin.ai. By submitting your details with us such as phone number or email, you consent to be contacted by us via phone calls, SMS notifications, and/or e-mails, in case of any subscription/service/marketing updates.",
              "For information about the Company's policies and practices regarding the collection and use of Your personally identifiable information, please read the Privacy Policy.",
              "You shall be solely responsible for compliance with the security practices and procedures as prescribed in the Information Technology Act, 2000 and the rules made thereunder and/or the rules and regulations of the Reserve Bank of India.",
            ],
          },
        ],
      },
      {
        heading: "2. Registration and Osfin.ai Services",
        blocks: [
          {
            type: "ul",
            items: [
              "To avail any services offered by the Company, you will have to register with Beeworks to create Your account. To register you will be required to open an account by completing the registration process, by providing us with current, complete and accurate information as prompted by the registration form. You may then update information relating to you.",
              "To access Your account on Osfin.ai, you will be asked to log in with your email address and password, to establish a unique identity for you. You are responsible for maintaining the confidentiality of your password, verification code, pin code, and account information, and are fully responsible for all activities that occur on your account. If there is any compromise on your password you can change your password using the 'Forgot Password?' functionality.",
              'The Company offers you a limited, non-exclusive, non-transferable, non-sublicensable license to the company\'s proprietary technology software hosted on Beeworks ("Osfin.ai Software") which helps you manage and reconcile e-commerce payments.',
              "You agree that you shall not, directly, indirectly, alone, or with another party: copy, disassemble, reverse engineer, or decompile the Beeworks Software; modify, create derivative works based upon, or translate the Beeworks Software; license, sell, rent, lease, transfer, grant any rights in or otherwise commercially exploit the Beeworks Software in any form to any other party, nor shall you attempt to do any of the foregoing or cause or permit any third party to do or attempt to do any of the foregoing, except as expressly permitted hereunder.",
              "At the time of registration, you are required to disclose the exact business category/business sub-category for which you will be using our services. The Company does not guarantee the consistency or the stability of Beeworks solution. Further, any services provided by the Company may be subject to change at the discretion of the Company, and the Company does not require your consent for the same.",
              'You agree that all notices, disclosures and other communications that the Company provides to you electronically, satisfy any legal requirement that those communications be in writing. You understand that the fees payable and related payments for the provision of services ("Fees") are non-refundable. You agree that the billing credentials provided by you for services from the Company will be accurate and you will not use billing credentials that are not lawfully owned by you. You are solely responsible for payment of all taxes, legal compliances and statutory registrations and reporting, if any.',
              "You understand that we only provide a license to the proprietary solution, Osfin.ai, in relation to payments reconciliation and are not in any way responsible for payments to be made by your customer or any refunds to be made to your customer. The relationship between our Company and you is not that of a principal-agent nor does the acceptance of these Terms of Use create any partnership or joint venture between us. You alone shall be responsible for your Customer. We are not concerned nor required to monitor in any manner the purpose of the payments made or services/products availed by your Customer.",
              "You shall be responsible at your own costs for providing and maintaining all necessary software and facilities to connect to and use Osfin.ai.",
              "You shall be responsible for any and all activities that occur under your account. We will not be liable for any loss that you may incur as a result of someone else using your account. However, you could be held liable for losses incurred by Us or another party due to someone else using your account.",
              "The information you input into the Beeworks Software when using the Services is controlled by you. You are wholly responsible for information you upload onto Osfin.ai. If you require that Beeworks be integrated from third-party platforms, you must ensure that necessary authorizations, licenses and permits to do so have been duly obtained. You agree to indemnify and hold harmless the Company from any claims that such integration was not duly authorized.",
              "Any data, results or reports generated from the use of Beeworks Software shall be solely owned by you. You, however, provide us with an irrevocable license to access and use the aggregated data/results to improve, modify or develop new products or services. All data/results are available for downloading from Osfin.ai. We encourage you to maintain a backup of the data in your systems.",
            ],
          },
        ],
      },
      {
        heading: "3. Prohibited Conduct",
        blocks: [
          {
            type: "p",
            text: "You agree that you shall not use Osfin.ai in order to host, display, upload, modify, publish, transmit, update, distribute, share, store or destroy material:",
          },
          {
            type: "ul",
            items: [
              "In violation of any applicable law or regulation;",
              "In a manner that will infringe the copyright, trademark, trade secret or other intellectual property or proprietary rights of others or violate the privacy, publicity or other personal rights of others;",
              "That belongs to another person and to which you do not have any right to;",
              "That is grossly harmful, harassing, blasphemous, defamatory, obscene, pornographic, paedophilic, libellous, invasive of another's privacy, threatening, abusive or hateful or racially, ethnically objectionable, disparaging, relating encouraging money laundering or gambling or otherwise unlawful in any manner whatsoever;",
              "Harm minors in any way;",
              "Deceives or misleads the addressee about the origin of such message or communicates any information which is grossly offensive or menacing in nature;",
              "Impersonate another person or entity;",
              "Contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of the Company's computer systems or site or the Company's users, customer's computer systems or site;",
              "Threatens the unity, integrity, defence, security or sovereignty of India, friendly relations with foreign states or of public order or causes incitement to the commission of any cognizable offence or prevents investigation of any offence or insulting any other nation;",
              "Any content which is non-compliant with the Information Technology Act, 2000, Rules and regulations, guidelines made thereunder, including Rule 3 of The Information Technology (Intermediaries Guidelines) Rules, 2011, Terms of Use or Privacy Policy, as amended/re-enacted from time to time.",
            ],
          },
          {
            type: "p",
            text: "You agree not to collect or harvest any personally identifiable information, including account names, from Osfin.ai, nor use Osfin.ai for any commercial solicitation purposes. If you become aware of misuse of Osfin.ai by any person, please contact pavan@osfin.ai.",
          },
        ],
      },
      {
        heading: "4. Preservation/Disclosure",
        blocks: [
          {
            type: "p",
            text: "You acknowledge, consent and agree that the Company may access, preserve and disclose your account information if required to do so by law or in a good faith belief that such access, preservation or disclosure is reasonably necessary to:",
          },
          {
            type: "ul",
            items: [
              "Comply with legal process nationally or internationally;",
              "Enforce these Terms and the Privacy Policy;",
              "Respond to claims that any Content violates the rights of third parties;",
              "Protect the rights, property or personal safety of the Company, its Users and the public; or",
              "Pursuant to the terms of the Privacy Policy.",
            ],
          },
        ],
      },
      {
        heading: "5. Security Components",
        blocks: [
          {
            type: "p",
            text: "You understand that Osfin.ai and the software hosted at *.osfin.ai may include security components that permit digital materials to be protected, and that use of these digital materials is subject to usage rules set by the Company. You shall not attempt to reverse engineer, override, disable, circumvent or otherwise interfere with any such security components and usage rules embedded into Osfin.ai.",
          },
        ],
      },
      {
        heading: "6. Links to Third Parties",
        blocks: [
          {
            type: "ul",
            items: [
              "For informational purposes, we may provide referrals to third party content or links to third party applications and/or websites, including entities/companies/businesses/individuals that have a relationship with Us (i.e. advertisers, affiliate partners, strategic partners, or others). We are not responsible for examining or evaluating, and we do not warrant the products or offerings of, any of these entities/companies/businesses/individuals, or the accuracy of the content of their applications or websites.",
              "We do not assume any responsibility or liability for the actions, product, and content of any such third party applications or websites.",
              "Before you access or visit any third party applications or websites, you should review the applicable terms of use and prevailing policies for such applications or websites.",
              "If you decide to access any such third party platform, you do so at your own risk. We will not be liable for any loss or damage incurred as the result of any transaction on such third party applications or websites.",
              "While interacting with any such third-party applications or websites found through Osfin.ai, we strongly encourage you to exercise reasonable diligence as you would in traditional offline channels and practice judgment before committing to any transaction or exchange of information.",
            ],
          },
        ],
      },
      {
        heading: "7. Marketing/Sales and Support",
        blocks: [
          {
            type: "p",
            text: "You agree that we may contact you through telephone, email, SMS, or any other electronic means for the purpose of: Marketing and Sales communications, obtaining feedback in relation to the platform or the product itself, resolving any complaints, information, or queries received from you. And you agree to provide your fullest cooperation further to such communication by the Company.",
          },
        ],
      },
      {
        heading: "8. Intellectual Property Rights",
        blocks: [
          {
            type: "ul",
            items: [
              'The Website is proprietary software developed and made available exclusively by Us. We are the sole owner of Osfin.ai and all software created to make the Website available to you. We provide you with a single limited license to use, and access Osfin.ai for the limited purpose of using the services. The license is specifically personal, non-transferable, and non-exclusive. All content on Osfin.ai, including, but not limited to, designs, text, graphics, graphs, images, information, logos, button icons, software, audio files and any other content ("Content") are our exclusive and sole property.',
              "You acknowledge that the Company owns all right, title and interest in and to all intellectual property rights in the Osfin.ai Software (including all derivatives or improvements thereof) and any suggestions, enhancement requests, feedback, or recommendations provided by you or any user relating to the Beeworks Software.",
              "All icons and logos are trademarks of and proprietary to Us. The unauthorized copying, modification, use or publication of these marks is strictly prohibited.",
              "All Content is our exclusive copyright or of our licensors, except the third party content and link to third party applications or websites. Systematic retrieval of our Content to create or compile, directly or indirectly, a collection, compilation, database or directory (whether through robots, spiders, automatic devices or manual processes) without our written permission is prohibited. In addition, use of the Content for any purpose not expressly permitted by Us in these Terms is prohibited and may invite legal action.",
              "Except as specifically provided herein or elsewhere in Osfin.ai, no Content may be copied, reproduced, republished, sold, downloaded, posted, transmitted, or distributed in any way, or otherwise used for any purpose, by any person or entity, without our prior express written permission. You may not add, delete, distort, or otherwise modify the Content. Any unauthorized attempt to modify any Content, to defeat or circumvent any security features, or to utilize Osfin.ai or any part of the Content for any purpose other than its intended purposes is strictly prohibited.",
              "All Content on Osfin.ai, including images, illustrations, audio clips, and video clips, are protected by copyrights, trademarks, and other intellectual property rights. The Content on Beeworks is solely for your personal, non-commercial use. You must not copy, reproduce, republish, upload, post, transmit or distribute such Content in any way, including by email or other electronic means and whether directly or indirectly and you must not assist any other person to do so. Without our prior written consent, modification of the Content, use of the Content on any other website, application or networked computer environment or use of the Content for any purpose other than personal, non-commercial use is a violation of the copyrights, trademarks and other proprietary rights, and is prohibited. Any use for which you receive any remuneration, whether in money or otherwise, is commercial use for the purposes of these Terms.",
              "The Company respects the intellectual property of others. In case you feel that your trademark or copyright has been infringed, you can write to Us at pavan@osfin.ai.",
              "When you upload or submit any information on Osfin.ai, you give Us a worldwide license to use, host, store and reproduce such information. The rights you grant in this license are for the limited purpose of operating, promoting, and improving our services, and to develop new ones.",
            ],
          },
        ],
      },
      {
        heading: "9. Terms and Termination",
        blocks: [
          {
            type: "ul",
            items: [
              "These Terms of Use shall remain in full force and effect for so long as you use Osfin.ai. You may delete your account at any time, for any reason, by following the instructions on Osfin.ai.",
              "We reserve the right to terminate the services or Osfin.ai without prior notice. Your account or your access to all or any part of Osfin.ai may be terminated immediately, with or without notice to you, and without liability to you, if the Company believes that you have breached any of these Terms, the Privacy Policy, or any false or misleading information, or interfered with the use of Osfin.ai by others.",
              "The Company reserves the right to cancel, delete or deactivate your Account, if it believes the same has been compromised, or is being used fraudulently, at its own discretion.",
              "We retain the right to terminate or downgrade your use of the services on Osfin.ai if you fail to duly make payments of amounts lawfully due to Us.",
            ],
          },
        ],
      },
      {
        heading: "10. Disclaimer of Warranties and Liability",
        blocks: [
          {
            type: "ul",
            items: [
              "You warrant that all information supplied by you for accessing the Website, including without limitation your name, e-mail address, mobile number and transactions related to it thereto, are correct and accurate, and belong to you.",
              "You shall be financially responsible for your use of Osfin.ai. You undertake to supervise and be responsible for accessing the Website under your account and absolve the Company from any liability on this account.",
              "The Company shall not be held responsible for any reason whatsoever, for any losses or damages incurred by you due to the use of Osfin.ai.",
              "The information and views contained on Osfin.ai are based on information available and believed to be correct to the best of our knowledge and we do not assume responsibility for the accuracy or for any loss arising out of any information contained herein.",
              "We will use our best efforts to protect the security and integrity of Osfin.ai. However, considering the inherent vulnerabilities of the internet, if there is a compromise to our systems, or if any unauthorized person hacks into or gains access to Beeworks, your accounts, you must understand that we will not be liable. We will address any such incident in the best and most reasonable manner.",
              "All Content on Osfin.ai (including but not limited to software), products and services, included on or otherwise made available to you through Beeworks are provided on \"AS IS\" and \"AS AVAILABLE\" basis without any representation or warranties, express or implied except otherwise specified in writing.",
              "Without prejudice to the foregoing, we do not warrant that Osfin.ai and services will be constantly available, or available at all, or is error-free; that the information on Osfin.ai is complete, true, accurate or non-misleading; that the quality of any services, content, information, or other Content on Osfin.ai will meet your expectations or requirements; or that any software used and/or licensed in connection with Osfin.ai will be compatible with other third-party software or devices nor that operation of Beeworks and the associated software will not damage or disrupt other software or hardware.",
              "All warranties including without limitation, the implied warranties of merchantability, fitness for a particular purpose, for the title and non-infringement are disclaimed and excluded.",
              "We will not be liable to you in any way or in relation to the Content, or use of, or otherwise, in connection with Osfin.ai. We do not warrant that Osfin.ai information, Content, product (including software) or services included on or otherwise made available to you through Osfin.ai are free of viruses or other harmful components.",
              "Our affiliates, respective investors, directors, employees, agents, suppliers, and Us shall not be liable, at any time for any, direct, indirect, punitive, incidental, special, consequential, damages arising out of or in any way connected with the use of Beeworks, whether based in contract, tort, strict liability, or other theory.",
              "Subject to applicable laws, in no event will we, our employees', agents, partners, contractors', aggregate liability arising from or related to the aforesaid services shall exceed the payments actually received and retained by us from you in the last three months of any claims having arisen, for any and all causes of action brought by you or your agents.",
            ],
          },
        ],
      },
      {
        heading: "11. Exclusions and Limitations",
        blocks: [
          {
            type: "p",
            text: "Those who access or use Osfin.ai from other jurisdictions do so at their own volition and are responsible for compliance with the local law. Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion of liability for incidental or consequential damages. Accordingly, in certain jurisdictions, some of the above limitations of liability may not apply to you; all other provisions of these Terms remain in full force and effect.",
          },
        ],
      },
      {
        heading: "12. Indemnity",
        blocks: [
          {
            type: "p",
            text: "You agree to defend, indemnify and hold harmless the Company, its subsidiaries, affiliates, subcontractors, officers, directors, employees, consultants, representatives and agents, from and against any and all claims, damages, obligations, losses, liabilities, costs or expenses (including but not limited to attorneys' fees and costs) arising from:",
          },
          {
            type: "ul",
            items: [
              "Your use of and access to Osfin.ai,",
              "Your violation of any Terms and the Privacy Policy contained herein;",
              "Any act by you which may corrupt, alter or modify our software or Osfin.ai,",
              "Your violation of any third party right, including without limitation any copyright, property, or privacy right;",
              "Any claim from an End User;",
              "Your violation of any applicable law.",
            ],
          },
        ],
      },
      {
        heading: "13. Additional Terms",
        blocks: [
          {
            type: "ul",
            items: [
              "We may also require you to follow additional rules, guidelines or other conditions in order to participate in certain promotions or activities available through Osfin.ai, to obtain certain Content through Osfin.ai, or for other reasons. These additional terms are part of these Terms, and you agree to comply with them when you participate in those promotions or otherwise engage in activities governed by such additional terms.",
              "We reserve the right at any time to modify, edit, delete, suspend or discontinue, temporarily or permanently the Service or any of Osfin.ai (or any portion thereof) with or without notice. You agree that we will not be liable to you or to any third party for any such modification, editing, deletion, suspension or discontinuance of Osfin.ai.",
              "These Terms and any rights and licenses granted hereunder, may not be transferred or assigned by you, but may be assigned by the Company without restriction.",
              "These Terms together with the Privacy Policy and any other legal notices published by the Company on Osfin.ai shall constitute the entire agreement between you and the Company concerning Osfin.ai, and governs your use of Beeworks, superseding any prior agreements between you and the Company with respect to Osfin.ai.",
              "The failure of the Company to exercise or enforce any right or provision of these Terms shall not constitute a waiver of such right or provision. If any provision of these Terms is found by a court of competent jurisdiction to be invalid, the Parties nevertheless agree that the court should endeavour to give effect to the Parties' intentions as reflected in the provision, and the other provisions of these Terms remain in full force and effect.",
              "These Terms are governed by the laws of India. Any matters arising under these terms shall be subject to the exclusive jurisdiction of courts located in Bangalore.",
            ],
          },
        ],
      },
      {
        heading: "14. Grievance Officer",
        blocks: [
          {
            type: "p",
            text: "In case of any grievance arising from the use of Osfin.ai, please contact pavan@osfin.ai.",
          },
        ],
      },
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    description:
      "How Beeworks Softwares Private Limited uses cookies and similar technologies on Osfin websites.",
    sections: [
      {
        heading: "1. Purpose",
        blocks: [
          {
            type: "p",
            text: "This Cookie Policy defines how Beeworks Organisation Pvt Ltd, a FinOps organization, uses cookies and similar technologies on its website to ensure:",
          },
          {
            type: "ul",
            items: [
              "Secure and reliable digital services",
              "Protection of customer and visitor data",
              "Compliance with applicable laws and regulations",
              "Alignment with ISO/IEC 27001:2022 Information Security Management System (ISMS)",
            ],
          },
        ],
      },
      {
        heading: "2. Scope",
        blocks: [
          {
            type: "p",
            text: "This policy applies to:",
          },
          {
            type: "ul",
            items: [
              "The official corporate and product websites.",
              "All visitors, customers, and users accessing the website.",
              "Employees, vendors, and third parties involved in website operations.",
            ],
          },
        ],
      },
      {
        heading: "3. Regulatory and Standard References",
        blocks: [
          {
            type: "ul",
            items: [
              "ISO/IEC 27001:2022 & ISO/IEC 27002:2022",
              "Digital Personal Data Protection Act, 2023 (India)",
              "Information Technology Act, 2000",
              "IT (Reasonable Security Practices and Procedures) Rules, 2011",
              "PCI DSS 4.0.1",
            ],
          },
        ],
      },
      {
        heading: "4. Definition of Cookies",
        blocks: [
          {
            type: "p",
            text: "Cookies are small text files stored on a user's device when a website is accessed. Cookies enable core website functionality, enhance security, support analytics, and improve user experience.",
          },
        ],
      },
      {
        heading: "5. Policy Statement",
        blocks: [
          {
            type: "p",
            text: "Beeworks Softwares Pvt Ltd uses cookies in a controlled, minimal, and secure manner. Cookies:",
          },
          {
            type: "ul",
            items: [
              "Do not store sensitive financial information such as passwords, PINs, CVV, or account details",
              "Are used only for defined and legitimate purposes",
              "Are subject to risk assessment, access controls, and consent management",
            ],
          },
        ],
      },
      {
        heading: "6. Categories of Cookies Used",
        blocks: [
          {
            type: "p",
            text: "6.1 Strictly Necessary Cookies. These cookies are essential for secure website operations and cannot be disabled. Purpose includes session management, fraud prevention, authentication and security controls, and load balancing. ISMS Alignment: A.8.20 (Network Security), A.8.15 (Logging), A.8.2 (Access Control).",
          },
          {
            type: "p",
            text: "6.2 Security Cookies. Used to protect the website and users from fraud, cyber attacks, and unauthorized access. Examples include CSRF tokens, bot detection cookies, and rate-limiting identifiers. ISMS Alignment: A.5.25 (Incident Management), A.8.16 (Monitoring Activities).",
          },
          {
            type: "p",
            text: "6.3 Analytics / Performance Cookies. Used to understand website performance and user behavior. Data is aggregated and anonymized. Examples include page visits, session duration, and traffic sources. Enabled only after user consent. ISMS Alignment: A.5.34 (Privacy & PII Protection), A.5.10 (Acceptable Use).",
          },
          {
            type: "p",
            text: "6.4 Functional Cookies. Used to remember user preferences and improve usability, including language preferences and region settings. Enabled only with consent.",
          },
          {
            type: "p",
            text: "6.5 Advertising / Tracking Cookies. Beeworks does not use advertising or behavioral tracking cookies.",
          },
        ],
      },
      {
        heading: "7. Cookie Inventory (Maintained Internally)",
        blocks: [
          {
            type: "ul",
            items: [
              "session_id — Category: Necessary. Purpose: User session management. Retention: Session.",
              "csrf_token — Category: Security. Purpose: Prevents CSRF attacks. Retention: Session.",
              "_ga — Category: Analytics. Purpose: Website analytics. Retention: 24 months.",
              "user_lang — Category: Functional. Purpose: Language preference. Retention: 6 months.",
            ],
          },
        ],
      },
      {
        heading: "8. Consent Management (DPDP Act, 2023)",
        blocks: [
          {
            type: "ul",
            items: [
              "User consent is obtained through a cookie consent banner",
              "Non-essential cookies are disabled by default",
              "Users may withdraw or modify consent at any time",
              "Consent records are maintained as compliance evidence",
            ],
          },
        ],
      },
      {
        heading: "9. Third-Party Cookies and Vendors",
        blocks: [
          {
            type: "p",
            text: "Where third-party services are used: vendors are assessed as per Supplier Risk Management Procedure; data protection and confidentiality clauses are contractually enforced; access is restricted on a need-to-know basis. ISMS Alignment: A.5.19 (Supplier Relationships), A.5.22 (Supplier Monitoring).",
          },
        ],
      },
      {
        heading: "10. Data Protection and Security Controls",
        blocks: [
          {
            type: "p",
            text: "Cookie-related data is protected using secure hosting environments, encryption in transit (TLS), access control and monitoring, and periodic vulnerability assessments.",
          },
        ],
      },
      {
        heading: "11. Information Security Incidents",
        blocks: [
          {
            type: "p",
            text: "Any incident involving cookie data shall be handled under the Information Security Incident Management Procedure, including investigation, containment, and corrective actions.",
          },
        ],
      },
      {
        heading: "12. Roles and Responsibilities",
        blocks: [
          {
            type: "ul",
            items: [
              "Board / Top Management — Governance and oversight",
              "CISO / ISMS Head — Policy enforcement and review",
              "IT & Security Team — Secure implementation",
              "Web Administrator — Cookie updates and inventory",
            ],
          },
        ],
      },
      {
        heading: "13. Monitoring and Audit",
        blocks: [
          {
            type: "ul",
            items: [
              "Compliance is reviewed during internal ISMS audits",
              "Findings are tracked through corrective action plans",
              "Policy effectiveness is reviewed during management review meetings",
            ],
          },
        ],
      },
      {
        heading: "14. Policy Review",
        blocks: [
          {
            type: "p",
            text: "This policy is reviewed annually, upon regulatory changes, and after major website or technology changes.",
          },
        ],
      },
    ],
  },
];

export function getLegalDoc(slug: string) {
  return LEGAL_DOCS.find((doc) => doc.slug === slug);
}

export function legalSlugs() {
  return LEGAL_DOCS.map((doc) => doc.slug);
}
