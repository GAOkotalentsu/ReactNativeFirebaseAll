export default function ncdQue() {
    var queData = {
        "numberOfQuestion": 6,
        "Ques": {
            "1": {
                "question": "• What is your age?  (in complete years )",
                "option": ["30 - 39 years", "40 - 49 years", "more than 50 years"],
                "score": [0, 1, 2],
                "gender": null
            },
            "2": {
                "question": "• Do you smoke or consume smokeless products such as Gutka or Khaini?",
                "option": ["Never", "Used to consume in the past / Sometimes now", "Daily"],
                "score": [0, 1, 2],
                "gender": null
            },
            "3": {
                "question": "• Do you consume Alcohol daily?",
                "option": ["No", "Yes"],
                "score": [0, 1],
                "gender": null
            },
            "4": {
                "question": "• Do you undertake any physical activities for minimum of 150 minutes in a week? ",
                "option": ["Less than 15 minutes in a week", "At least 15 minutes in a week"],
                "score": [0, 1],
                "gender": null
            },
            "5": {
                "question": "• Measurement of waist  (in cm)",
                "option": {
                    "m": ["less than 90 cm", "90 - 100 cm", "more than 100"],
                    "f": ["less than 80 cm", "80 - 90 cm", "more than 90"],
                },
                "score": [0, 1, 2],
                "gender": 'b'
            },
            "6": {
                "question": "• Do you have a family history (any one of your parents or siblings) of high blood pressure, diabetes and heart disease?",
                "option": ["Yes", "No"],
                "score": [2, 0],
                "gender": null
            },
        }
    }
    return (queData);
}