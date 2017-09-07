
var $GI = (function () {

    init();

    return {
        generateAbilitiesList : generateAbilitiesList,
        generateList : generateList,
        generateRacesList : generateRacesList,
        getAbilitiesDetail : getAbilitiesDetail,
        getRaceDetail : getRaceDetail,
        getSkillDetail: getSkillDetail,
        handleAbilityScores: handleAbilityScores,
        handleRaces: handleRaces,
        handleSkills: handleSkills
    }

    function abilityDetailCallback(data) {
        $('#details').empty();

        var description = data.desc.map((desc) => '<p>' + desc + '</p>')

        $('#details').append(`
        <h2>${data.full_name}</h2>
        <p>${(data.desc)}</p>
    `);
    }

    function abilityScoresCallback(data) {
        $('#list').empty();
        $('#list').append(
            data.results.map(generateAbilitiesList)
        );
    }

    function commError(response) {
        console.error('Abandon Ship');
        console.log(response);
    }

    function generateAbilitiesList(item) {
        return '<li><a href="#" onclick="$GI.getAbilitiesDetail(\'' + item.url + '\')">' + item.name + '</a></li>';
    }

    function generateList(item) {
        return '<li><a href="#" onclick="$GI.getSkillDetail(\'' + item.url + '\')">' + item.name + '</a></li>';
    }

    function generateRacesList(item) {
    return '<li><a href="#" onclick="$GI.getRaceDetail(\'' + item.url + '\')">' + item.name + '</a></li>';
    }

    function getAbilitiesDetail(url) {
        $.ajax({
            type: 'GET',
            url: url,
            jsonp: 'jsonp',
            success: abilityDetailCallback,
            error: commError
        });
    }

    function getRaceDetail(url) {
        $.ajax({
            type: 'GET',
            url: url,
            jsonp: 'jsonp',
            success: raceDetailCallback,
            error: commError
        });
    }

    function getSkillDetail(url) {
        $.ajax({
            type: 'GET',
            url: url,
            jsonp: 'jsonp',
            success: skillDetailCallback,
            error: commError
        });
    }

    function handleAbilityScores() {
        $.ajax({
            type: 'GET',
            url: 'http://www.dnd5eapi.co/api/ability-scores',
            jsonp: 'jsonp',
            success: abilityScoresCallback,
            error: commError
        });
    }

    function handleRaces() {
        console.log('help')
        $.ajax({
            type: 'GET',
            url: 'http://www.dnd5eapi.co/api/races',
            jsonp: 'jsonp',
            success: racesCallback,
            error: commError
        });
    }

    function handleSkills() {
        $.ajax({
            type: 'GET',
            url: 'http://www.dnd5eapi.co/api/skills',
            jsonp: 'jsonp',
            success: skillsCallback,
            error: commError
        });
    }

    function init() {
        $('#details').append(`<h1>What to Know Before you Roll</h1> <p>Welcome to my need to know before your roll assistant. This site is designed to answer all your questions about various races, ability scores, and skills you may want to know before you nail down the specifics for that newest Dungeons and Dragons character.</p>`);
    }

    function raceDetailCallback(data) {
        $('#details').empty();

        var starting_proficiencies = data.starting_proficiencies.map(pro => '<li>' + pro.name + '</li>').join('');

        $('#details').append(`
        <h2>${data.name}</h2>
        <p>${replaceYou(data.alignment, data.name)}</p>
        <p>${replaceYou(data.age, data.name)}</p>
        
        <p>${replaceYou(data.language_desc, data.name)}</p> 
        <h5>Proficiencies</h5> 
        <ul>${starting_proficiencies}</ul>
    `);
    }

    function racesCallback(data) {
    console.log('boy');
    $('#list').empty();
    $('#list').append(
        data.results.map(generateRacesList)
    );
    }

    function replaceYou(text, name) {
        text = text.replace('you', 'the ' + name.toLowerCase());
        return text.replace('You', 'The ' + name.toLowerCase());
    }

    function skillsCallback(data) {
        $('#list').empty();
        $('#list').append(
            data.results.map(generateList)
        );
    }

    function skillDetailCallback(data) {
        $('#details').empty();

        var description = data.desc.map((desc) => '<p>' + desc + '</p>')

        $('#details').append(`
        <h2>${data.name}</h2>
        <p>${(data.desc)}</p>
    `);
    }

})();



//$('#classesbtn').click(handleClasses);

//function handleClasses() {
//    $.ajax({
//        type: 'GET',
//        url: 'http://www.dnd5eapi.co/api/classes',
//        jsonp: 'jsonp',
//        success: classesCallback,
//        error: commError
//    });
//}

//function classesCallback(data) {
//    $('#list').empty();
//    $('#list').append(
//        data.results.map(generateList)
//    );
//}

//function generateList(item) {
//    return '<li><a href="#" onclick="getClassesDetail(\'' + item.url + '\')">' + item.name + '</a></li>';
//}

//function classesDetailCallback(data) {
//    $('#details').empty();

//    var description = data.desc.map((desc) => '<p>' + desc + '</p>')

//    $('#details').append(`
//        <h2>${data.full_name}</h2>
//        <p>${(data.desc)}</p>
//    `);
//}






