import constants from '../constants.js'
import { autocomplete } from '../utilities/autocomplete.js'

export async function openSkillEditDialog (actor, skillName) {
  const data = actor.data.data
  const skillsUpdated = duplicate(data.skills)
  const skillIdx = skillsUpdated.findIndex(s => s.name === skillName)
  const skill = skillsUpdated[skillIdx]

  // Render the skill editing template
  const html = await renderTemplate('systems/tvb/templates/actor/edit-skill.html', {
    constants,
    skill,
  })

  return new Dialog({
    title: game.i18n.localize('TVB.EditSkill'),
    content: html,
    default: 'submit',
    render: onDialogRender(actor, skillsUpdated, skillIdx),
    buttons: {
      submit: {
        callback: onSubmitCallback(actor, skillsUpdated, skillIdx),
        icon: '<i class="fas fa-check"></i>',
        label: game.i18n.localize('TVB.UpdateSkill'),
      },
      delete: {
        callback: onDeleteCallback(actor, skillsUpdated, skillIdx),
        icon: '<i class="fas fa-trash"></i>',
        label: game.i18n.localize('TVB.DeleteSkill'),
      },
      cancel: {
        icon: '<i class="fas fa-times"></i>',
        label: game.i18n.localize('TVB.Cancel'),
      },
    },
  }).render(true)
}

function onDialogRender (actor, skillsUpdated, skillIdx) {
  return function ($html) {
    const skill = skillsUpdated[skillIdx]
    // setup autocomplete for skill name
    const nameInput = $html.find('input[name=name]')[0]
    autocomplete(nameInput, Object.keys(constants.DEFAULT_SKILLS))
    // setup default stat
    $html.find(`select[name=stat]`)[0].value = skill.stat
    $html.find(`input[name=name]`).change(e => onNameUpdated($html, e.target.value))
  }
}

function onNameUpdated($html, skillName) {
  const defaultStat = constants.DEFAULT_SKILLS[skillName]
  if (defaultStat !== undefined)
    $html.find(`select[name=stat]`)[0].value = defaultStat
}

function onSubmitCallback (actor, skillsUpdated, skillIdx) {
  return function ($html) {
    const skill = skillsUpdated[skillIdx]
    skill.name = $html.find('[name=name]')[0].value
    skill.rank = $html.find('[name=rank]')[0].value
    skill.stat = $html.find('[name=stat]')[0].value
    skill.description = $html.find('[name=description]')[0].value
    actor.update({ 'data.skills': skillsUpdated })
  }
}

function onDeleteCallback (actor, skillsUpdated, skillIdx) {
  return function () {
    delete skillsUpdated[skillIdx]
    actor.update({ 'data.skills': skillsUpdated })
  }
}