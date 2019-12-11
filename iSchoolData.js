import React from 'react';
import { StyleSheet, FlatList, Text, SafeAreaView, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { shuffleArray } from './Shuffle'
import { reload } from 'expo/build/Updates/Updates';

// from here: https://ischools.org/members/directory/
// cleaned using Excel
const iSchoolNames = [
    'Drexel University: College Computing & Informatics',
    'University of Pittsburgh: School of Computing and Information',
    'Syracuse University: School of Information Studies',
    'University of Michigan: School of Information',
    'University of Washington: The Information School',
    'Florida State University: College of Communication and Information',
    'University of Illinois at Urbana-Champaign: School of Information Sciences',
    'Indiana University: School of Informatics, Computing, and Engineering',
    'University of North Carolina at Chapel Hill: School of Information and Library Science',
    'University of Texas: School of Information',
    'University of California, Berkeley: School of Information',
    'University of California, Irvine: Donald Bren School of Information and Computer Sciences',
    'University of California, Los Angeles: Graduate School of Education and Information Studies',
    'Georgia Tech: College of Computing',
    'University of Maryland: College of Information Studies',
    'The Pennsylvania State University: College of Information Sciences and Technology',
    'Rutgers, The State University of New Jersey: School of Communication and Information',
    'Carnegie Mellon University, Heinz College: School of Information Systems and Management School of Public Policy and Management',
    'Humboldt-Universität zu Berlin: Berlin School of Library and Information Science',
    'Wuhan University: School of Information Management',
    'University of Maryland, Baltimore County: Department of Information Systems',
    'University of North Texas: College of Information',
    'The University of Sheffield: Information School',
    'University of British Columbia: The School of Library, Archival & Information Studies',
    'University of Kentucky: College of Communications and Information',
    'University of Wisconsin-Milwaukee: School of Information Studies',
    'University of Missouri: School of Information Science and Learning Technologies',
    'The University of Tennessee: School of Information Sciences',
    'University of Arizona: School of Information',
    'Cornell University: Faculty of Computing and Information Science',
    'Kent State University: School of Information',
    'Renmin University of China: School of Information Resource Management',
    'Peking University: Department of Information Management',
    'San Jose State University: School of Information',
    'Central China Normal University: School of Information Management',
    'Monash University: Faculty of Information Technology'
];

// const numbers = iSchoolNames.map((item, index) => index);
// console.log(numbers);

class iSchool {
    constructor(s) {
        let parts = s.split(":");
        this.univ = parts[0].trim();
        this.school = parts[1].trim();
        this.key = s;
    }
}

export function getISchools() {
    let iSchools = [];
    for (s of iSchoolNames) {
        iSchools.push(new iSchool(s));
    }    
    return iSchools;
}

export class SchoolList extends React.Component {
    constructor(props){
      super(props);
      let d = new Date();
      let date = d.toLocaleString();

      let schools = getISchools();
      let otherSchools = schools.slice(0, 3).concat(schools.slice(4, schools.length));
      let michigan = schools[3];
      let rSchools = shuffleArray(otherSchools);
      rSchools.unshift(michigan);

    //   numbers = (rSchools.map((item, index) => index)).slice(1, (rSchools.map((item, index) => index)).length );
    //   numbers.push(36)
    //   console.log(numbers);

      this.state = {
        schoolList: rSchools,
        date: date
      }
    }

    updateList = () => {
        let d = new Date();
        let date = d.toLocaleString();

        let schools = getISchools();
        let otherSchools = schools.slice(0, 3).concat(schools.slice(4, schools.length))
        let michigan = schools[3];
        let rSchools = shuffleArray(otherSchools);
        rSchools.unshift(michigan);

        this.setState(() => ({
            schoolList: rSchools,
            date: date
        }));

    }
  
    render() {
      return (
        <SafeAreaView style={styles.body}>
          <View style={styles.headerBG}>
            <View style={styles.textBG}>
             <Text style={styles.header}>
                iSchool Rankings
             </Text>
             <Text style={styles.date}>
                Updated: {this.state.date}
             </Text>
            </View>
            <View style={styles.iconBG}>
             <Icon name="refresh" size={40} color="#fff" onPress={ () => this.updateList()}/>
          </View>
          </View>
          <View style={styles.listBG}>
            <FlatList data={this.state.schoolList} 
            renderItem={({item, index}) => 
            <View style={styles.schoolItems}>
              <View style={styles.BG}>
                <Text style={styles.number}> {index + 1} </Text>
              </View>
              <View>
                <Text style={styles.uniText} ellipsizeMode='tail' numberOfLines={1}>{item.univ}</Text>
                <Text style={styles.schoolText} ellipsizeMode='tail' numberOfLines={1}>{item.school}</Text>
              </View>
            </View>
            }
            />
          </View>
        </SafeAreaView>
      );
    }
}

// console.log(getISchools());

const styles = StyleSheet.create({
   body: {
       flex: 1,
       backgroundColor: '#fff',
       alignItems: 'center',
       justifyContent: 'center',
    },

    headerBG: {  
        flex: .2,
        backgroundColor: '#00274c',
        flexDirection: 'row',
    },

    textBG: {  
        flex: .7,
        justifyContent: 'center',
        padding: 20
    },

    iconBG: {  
        flex: .3,
        justifyContent: 'center',
        alignItems: 'center',
    },

    listBG: {
        flex: .8,
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },

    schoolItems: {
        flex: 1,
        flexDirection: 'row',
        padding: 2
    },

    BG: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50
    },

    number: {
        color: 'purple',
        fontSize: 28,
        paddingRight: 10,
    },

    header: {
        fontSize: 40,
        color: '#fff'
    },
    
    date: {
        fontSize: 12,
        color: '#fff'
    },

    uniText: {
        color: '#00274c',
        width: 350,
        fontSize: 20,
    },

    schoolText: {
        width: 300,
        fontSize: 14,
    }
});
