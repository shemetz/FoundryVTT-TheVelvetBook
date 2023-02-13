const constants = {}

constants.ARCANA = {
  'Fool': {
    index: 0,
    staticImage: 'https://i.imgur.com/8SOjbGh.png',
    animatedImageWithBorder: 'https://i.imgur.com/BtJ7qph.gif', // "The Fool"
    animatedImageWithoutBorder: 'https://i.imgur.com/cASitFy.gif',
    extra: 'None',
  },
  'Magician': {
    index: 1,
    staticImage: 'https://i.imgur.com/QvCwUA1.png',
    animatedImageWithBorder: 'https://i.imgur.com/daU2JlS.gif', // "The Magician"
    animatedImageWithoutBorder: 'https://i.imgur.com/tVmi2Zh.gif',
    extra: 'Power (Elemental)',
  },
  'High Priestess': {
    index: 2,
    staticImage: 'https://i.imgur.com/JwUBHVd.png',
    animatedImageWithBorder: 'https://i.imgur.com/geLJhwP.gif', // "The High Priestess"
    animatedImageWithoutBorder: 'https://i.imgur.com/Llxj7vY.gif',
    extra: 'Effective',
  },
  'Empress': {
    index: 3,
    staticImage: 'https://i.imgur.com/Ro7a029.png',
    animatedImageWithBorder: 'https://i.imgur.com/wvpJwzG.gif', // "The Empress"
    animatedImageWithoutBorder: 'https://i.imgur.com/hIZgwsm.gif',
    extra: 'Area',
  },
  'Emperor': {
    index: 4,
    staticImage: 'https://i.imgur.com/XQhbFiR.png',
    animatedImageWithBorder: 'https://i.imgur.com/FSw8Sjb.gif', // "The Emperor"
    animatedImageWithoutBorder: 'https://i.imgur.com/WeEIwEO.gif',
    extra: 'Power (Physical)',
  },
  'Hierophant': {
    index: 5,
    staticImage: 'https://i.imgur.com/IAKm3LR.png',
    animatedImageWithBorder: 'https://i.imgur.com/E8vNbUI.gif', // "The Hierophant"
    animatedImageWithoutBorder: 'https://i.imgur.com/iJNHDo0.gif',
    extra: 'Effective',
  },
  'Lovers': {
    index: 6,
    staticImage: 'https://i.imgur.com/eAt5zpB.png',
    animatedImageWithBorder: 'https://i.imgur.com/oV3pu5B.gif', // "The Lovers"
    animatedImageWithoutBorder: 'https://i.imgur.com/uu7fZMw.gif',
    extra: 'Heal',
  },
  'Chariot': {
    index: 7,
    staticImage: 'https://i.imgur.com/NQBz4l9.png',
    animatedImageWithBorder: 'https://i.imgur.com/BGLIWTL.gif', // "The Chariot"
    animatedImageWithoutBorder: 'https://i.imgur.com/zALBMu3.gif',
    extra: 'Fast',
  },
  'Justice': {
    index: 8,
    staticImage: 'https://i.imgur.com/6OlgRRf.png',
    animatedImageWithBorder: 'https://i.imgur.com/KmZ0gWB.gif',
    animatedImageWithoutBorder: 'https://i.imgur.com/Bg3Cmmg.gif',
    extra: 'Fast',
  },
  'Hermit': {
    index: 9,
    staticImage: 'https://i.imgur.com/b5TfJkV.png',
    animatedImageWithBorder: 'https://i.imgur.com/BpBEimY.gif', // "The Hermit"
    animatedImageWithoutBorder: 'https://i.imgur.com/ATmOS68.gif',
    extra: 'Power (Elemental)',
  },
  'Fortune': {
    index: 10,
    staticImage: 'https://i.imgur.com/zqfj1mZ.png',
    animatedImageWithBorder: 'https://i.imgur.com/PGGSLdG.gif', // "Wheel of Fortune"
    animatedImageWithoutBorder: 'https://i.imgur.com/UdQJfh1.gif',
    extra: 'Recoil',
  },
  'Strength': {
    index: 11,
    staticImage: 'https://i.imgur.com/ZylDxgn.png',
    animatedImageWithBorder: 'https://i.imgur.com/dv4Ye43.gif',
    animatedImageWithoutBorder: 'https://i.imgur.com/HI91X8i.gif',
    extra: 'Tough',
  },
  'Hanged Man': {
    index: 12,
    staticImage: 'https://i.imgur.com/kDJiKRs.png',
    animatedImageWithBorder: 'https://i.imgur.com/O9fy7zl.gif', // "The Hanged Man"
    animatedImageWithoutBorder: 'https://i.imgur.com/DaXX2o4.gif',
    extra: 'Tough',
  },
  'Death': {
    index: 13,
    staticImage: 'https://i.imgur.com/Doj3IOk.png',
    animatedImageWithBorder: 'https://i.imgur.com/8pKJPWE.gif',
    animatedImageWithoutBorder: 'https://i.imgur.com/ohg5jcK.gif',
    extra: 'Power (Physical)',
  },
  'Temperance': {
    index: 14,
    staticImage: 'https://i.imgur.com/Vimc824.png',
    animatedImageWithBorder: 'https://i.imgur.com/RiJNWuI.gif',
    animatedImageWithoutBorder: 'https://i.imgur.com/Mn3OD1R.gif',
    extra: 'Burn',
  },
  'Devil': {
    index: 15,
    staticImage: 'https://i.imgur.com/V6j3akV.png',
    animatedImageWithBorder: 'https://i.imgur.com/XlhrLcO.gif', // "The Devil"
    animatedImageWithoutBorder: 'https://i.imgur.com/XP5albL.gif',
    extra: 'Burn',
  },
  'Tower': {
    index: 16,
    staticImage: 'https://i.imgur.com/T6B6K1S.png',
    animatedImageWithBorder: 'https://i.imgur.com/BsMBI3x.gif', // "The Tower"
    animatedImageWithoutBorder: 'https://i.imgur.com/WwjVgfc.gif',
    extra: 'Recoil',
  },
  'Star': {
    index: 17,
    staticImage: 'https://i.imgur.com/OKLUugm.png',
    animatedImageWithBorder: 'https://i.imgur.com/j3KIOMQ.gif', // "The Star"
    animatedImageWithoutBorder: 'https://i.imgur.com/xhq6yKD.gif',
    extra: 'Heal',
  },
  'Moon': {
    index: 18,
    staticImage: 'https://i.imgur.com/ADhiodR.png',
    animatedImageWithBorder: 'https://i.imgur.com/rupVSfw.gif', // "The Moon"
    animatedImageWithoutBorder: 'https://i.imgur.com/dWbF3E7.gif',
    extra: 'Area',
  },
  'Sun': {
    index: 19,
    staticImage: 'https://i.imgur.com/wcz4Ja9.png',
    animatedImageWithBorder: 'https://i.imgur.com/B9lue9i.gif', // "The Sun"
    animatedImageWithoutBorder: 'https://i.imgur.com/9VBPzIQ.gif',
    extra: 'Spray',
  },
  'Judgement': {
    index: 20,
    staticImage: 'https://i.imgur.com/OAzOYz0.png',
    animatedImageWithBorder: 'https://i.imgur.com/hftF93V.gif', // also https://i.imgur.com/AmcdhdH.gif
    animatedImageWithoutBorder: 'https://i.imgur.com/RQI2ZGM.gif',
    extra: 'Spray',
  },
  'World': {
    index: 21,
    staticImage: 'https://i.imgur.com/mBUDZGc.png',
    animatedImageWithBorder: 'https://i.imgur.com/zauJJXM.gif',
    animatedImageWithoutBorder: 'https://i.imgur.com/7dak00q.gif',
    extra: 'None',
  },
}

constants.ARCANA_MISSING = {
  index: 999,
  staticImage: 'https://i.imgur.com/Rkz0Rie.png',
  animatedImageWithBorder: 'https://i.imgur.com/Rkz0Rie.png',
  animatedImageWithoutBorder: 'https://i.imgur.com/Rkz0Rie.png',
  extra: 'None',
}

constants.STATS = {
  'diligence': 'Diligence',
  'guts': 'Guts',
  'proficiency': 'Proficiency',
  'knowledge': 'Knowledge',
  'expression': 'Expression',
}

/**
 * Default skills and mappings to default stats
 */
constants.DEFAULT_SKILLS = {
  'Beat-Down': 'diligence',
  'Block': 'diligence',
  'P.E.': 'diligence',
  'Courage': 'guts',
  'Fighting': 'guts',
  'Wind': 'guts',
  'Aim': 'proficiency',
  'Reflex': 'proficiency',
  'Shop': 'proficiency',
  'Academics': 'knowledge',
  'Notice': 'knowledge',
  'Out-Think': 'knowledge',
  'Charm': 'expression',
  'Connive': 'expression',
  'Put-Down': 'expression',
}

export default constants