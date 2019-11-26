const Sequelize = require('sequelize');

const Operators = {
    and: Sequelize.Op.and,// [{a: 5}, {b: 6}] (a = 5) AND (b = 6)
    or: Sequelize.Op.or, //[{a: 5}, {a: 6}]   (a = 5 OR a = 6)
    gt: Sequelize.Op.gt,// 6   > 6
    gte: Sequelize.Op.gte,//6   >= 6
    lt: Sequelize.Op.lt,//6   < 6
    lte: Sequelize.Op.lte,//10  <=10
    ne: Sequelize.Op.ne,//20 !=20
    eq: Sequelize.Op.eq,//3 =3
    is: Sequelize.Op.is, // null   is NULL
    not: Sequelize.Op.not,//true  is NOT true
    between: Sequelize.Op.between,//[6, 10],     BETWEEN 6 AND 10
    notBetween: Sequelize.Op.notBetween,// [11, 15],  NOT BETWEEN 11 AND 15
    in: Sequelize.Op.in,//[1, 2],  IN (1,2)
    notIn: Sequelize.Op.notIn,
    like: Sequelize.Op.like,//'%haha%'     like '%haha%'   
    notLike: Sequelize.Op.notLike,
    startsWith: Sequelize.Op.startsWith, //'hat'     // LIKE 'hat%'
    endsWith: Sequelize.Op.endsWith,//'hat'     // LIKE '%hat'
    substring: Sequelize.Op.substring,//'hat'  LIKE '%hat%'
    regexp: Sequelize.Op.regexp,
    notRegexp: Sequelize.Op.notRegexp,
    iRegexp: Sequelize.Op.iRegexp,
    notIRegexp: Sequelize.Op.notIRegexp,
    overlap: Sequelize.Op.overlap,
    contains: Sequelize.Op.contains,
    contained: Sequelize.Op.contained,
    any: Sequelize.Op.any,
    col: Sequelize.Op.lte, //'user.organization_id'    sql is : = "user"."organization_id"
};


module.exports = Operators;