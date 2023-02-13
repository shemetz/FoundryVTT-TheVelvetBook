import constants from '../constants.js'
import { openSkillEditDialog } from './skill-edit-dialog.js'

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class TvbActorSheet extends ActorSheet {

  /** @override */
  static get defaultOptions () {
    return mergeObject(super.defaultOptions, {
      classes: ['tvb', 'sheet', 'actor'],
      template: 'systems/tvb/templates/actor/actor-sheet.html',
      width: 600,
      height: 600,
      tabs: [{ navSelector: '.sheet-tabs', contentSelector: '.sheet-body', initial: 'skills' }],
    })
  }

  /* -------------------------------------------- */

  /** @override */
  getData () {
    const data = super.getData()
    data.dtypes = ['String', 'Number', 'Boolean']
    for (let attr of Object.values(data.data.attributes)) {
      attr.isCheckbox = attr.dtype === 'Boolean'
    }

    // Prepare items.
    if (this.actor.data.type === 'character') {
      this._prepareCharacterItems(data)
    }

    return data
  }

  /**
   * Organize and classify Items for Character sheets.
   */
  _prepareCharacterItems (sheetData) {
    const actorData = sheetData.actor

    // Initialize containers.
    const gear = []
    const features = []
    const spells = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
    }

    // Iterate through items, allocating to containers
    // let totalWeight = 0;
    for (let i of sheetData.items) {
      let item = i.data
      i.img = i.img || DEFAULT_TOKEN
      // Append to gear.
      if (i.type === 'item') {
        gear.push(i)
      }
      // Append to features.
      else if (i.type === 'feature') {
        features.push(i)
      }
      // Append to spells.
      else if (i.type === 'spell') {
        if (i.data.__spellLevel != undefined) {
          spells[i.data.__spellLevel].push(i)
        }
      }
    }

    const statsForBars = Object.keys(actorData.data.stats).map((statName, idx) => {
      const stat = actorData.data.stats[statName]
      // sectionClassByIndex will have length of 5 and will be composed of four possible string values in this order
      const sectionClassByIndex = []
        .concat(new Array(stat.value - stat.shock - stat.scars).fill('stat-yes'))
        .concat(new Array(stat.shock).fill('stat-shock'))
        .concat(new Array(stat.scars).fill('stat-scar'))
        .concat(new Array(5 - stat.value).fill('stat-no'))
      sectionClassByIndex[0] = sectionClassByIndex[0] + ' first'
      return {
        readableName: game.i18n.localize(`TVB.Stat_${statName}`),
        statName,
        sectionClassByIndex,
        isFirst: idx === 0,
      }
    })

    // Assign and return
    actorData.gear = gear
    actorData.features = features
    actorData.spells = spells
    actorData.statsForBars = statsForBars
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners (html) {
    super.activateListeners(html)

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return

    // Add Inventory Item
    html.find('.item-create').click(this._onItemCreate.bind(this))

    // Update Inventory Item
    html.find('.item-edit').click(ev => {
      const li = $(ev.currentTarget).parents('.item')
      const item = this.actor.getOwnedItem(li.data('itemId'))
      item.sheet.render(true)
    })

    // Delete Inventory Item
    html.find('.item-delete').click(ev => {
      const li = $(ev.currentTarget).parents('.item')
      this.actor.deleteOwnedItem(li.data('itemId'))
      li.slideUp(200, () => this.render(false))
    })

    // Rollable abilities.
    html.find('.rollable').click(this._onRoll.bind(this))

    // Drag events for macros.
    if (this.actor.owner) {
      let handler = ev => this._onDragStart(ev)
      html.find('li.item').each((i, li) => {
        if (li.classList.contains('inventory-header')) return
        li.setAttribute('draggable', true)
        li.addEventListener('dragstart', handler, false)
      })
    }

    // Edit arcana
    html.find('img[data-editarcana]').click(ev => this.onEditArcana(ev))

    // Edit stats (each individual stat bar section is clickable)
    html.find('div.bar-section').click(ev => this.onClickBarSection(ev, true))
    html.find('div.bar-section').bind('contextmenu', ev => this.onClickBarSection(ev, false))

    // set input fields via editable elements (copied from Tidy5e)
    html.find('[contenteditable]').on('keypress', function (e) {
      if (e.keyCode === 13) {
        $(this).blur()
      }
    })
    html.find('[contenteditable]').blur(async (event) => {
      let value = event.target.textContent
      let target = event.target.dataset.target
      html.find('input[type="hidden"][data-input="' + target + '"]').val(value).submit()
    })

    // Add/edit/delete skills
    html.find('.skill-create').click(this._onSkillCreate.bind(this))
    html.find('.skill-edit').click(this._onSkillEdit.bind(this))
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  _onItemCreate (event) {
    event.preventDefault()
    const header = event.currentTarget
    // Get the type of item to create.
    const type = header.dataset.type
    // Grab any data associated with this control.
    const data = duplicate(header.dataset)
    // Initialize a default name.
    const name = `New ${type.capitalize()}`
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      data: data,
    }
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.data['type']

    // Finally, create the item!
    return this.actor.createOwnedItem(itemData)
  }

  _onSkillCreate (event) {
    event.preventDefault()
    const data = this.actor.data.data
    const skills = data.skills
    const skill = {
      name: game.i18n.localize('TVB.DefaultSkillName'),
      rank: 0,
      stat: 'knowledge',
      description: game.i18n.localize('TVB.DefaultSkillDescription'),
    }
    const skillsUpdated = duplicate(skills)
    if (skills.length >= 1 && skills[skills.length - 1].name === skill.name) {
      console.log(`TVB | Not adding a new skill because a new one is already ready to edit`)
    } else {
      skillsUpdated.push(skill)
    }
    this.actor.update({ 'data.skills': skillsUpdated }).then(() => {
      openSkillEditDialog(this.actor, skill.name)
    })
  }

  _onSkillEdit (event) {
    event.preventDefault()
    const skillName = event.currentTarget.dataset.skill
    openSkillEditDialog(this.actor, skillName)
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  _onRoll (event) {
    event.preventDefault()
    const element = event.currentTarget
    const dataset = element.dataset

    if (dataset.roll) {
      let roll = new Roll(dataset.roll, this.actor.data.data)
      let label = dataset.label ? `Rolling ${dataset.label}` : ''
      roll.roll().toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
      })
    }
  }

  onEditArcana (event) {
    event.preventDefault()
    const arcanaCardButtons = {}
    Object.keys(constants.ARCANA).forEach(name => {
      arcanaCardButtons[name] = {
        label: name,
        callback: () => this.actor.update({ 'data.arcana': name }),
      }
    })
    return new Dialog({
      title: game.i18n.localize('TVB.ChooseAnArcana'),
      // TODO: content with image of each arcana
      buttons: {
        ...arcanaCardButtons,
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: 'CANCEL',
        },
      },
    }).render(true)
  }

  /**
   * when the user clicks on a stat bar section, it will cycle between making that "section" one
   * of four states:  full, shocked, scarred, empty.
   *
   * - normal click cycles up between full/shocked/scarred
   * - right click cycles down
   * - shift+click adds +1 to maximum
   * - shift+right click reduces maximum by 1
   */
  onClickBarSection (event, trueLeftOrRight) {
    event.preventDefault()
    const isLeftClick = trueLeftOrRight
    const isRightClick = !trueLeftOrRight
    const isShiftClick = event.shiftKey
    const dataset = event.currentTarget.dataset
    const statName = dataset['statName']
    const stat = this.actor.data.data.stats[statName]
    let sectionClass = dataset['sectionClass']
    if (sectionClass.endsWith(' first'))
      sectionClass = sectionClass.substr(0, sectionClass.indexOf(' first'))
    switch (sectionClass) {
      case 'stat-yes':
        if (isShiftClick && isLeftClick)
          ui.notifications.info('Hold Shift while right-clicking to reduce maximum stat value.')
        if (!isShiftClick && isLeftClick)
          this.actor.update({ [`data.stats.${statName}.shock`]: stat.shock + 1 })
        if (isShiftClick && isRightClick)
          this.actor.update({ [`data.stats.${statName}.value`]: stat.value - 1 })
        return
      case 'stat-shock':
        if (!isShiftClick && isLeftClick)
          this.actor.update({
            [`data.stats.${statName}.shock`]: stat.shock - 1,
            [`data.stats.${statName}.scars`]: stat.scars + 1,
          })
        if (!isShiftClick && isRightClick)
          this.actor.update({
            [`data.stats.${statName}.shock`]: stat.shock - 1,
          })
        if (isShiftClick && isRightClick)
          this.actor.update({
            [`data.stats.${statName}.shock`]: stat.shock - 1,
            [`data.stats.${statName}.value`]: stat.value - 1,
          })
        return
      case 'stat-scar':
        if (!isShiftClick && isRightClick)
          this.actor.update({
            [`data.stats.${statName}.scars`]: stat.scars - 1,
          })
        if (isShiftClick && isRightClick)
          this.actor.update({
            [`data.stats.${statName}.scars`]: stat.scars - 1,
            [`data.stats.${statName}.value`]: stat.value - 1,
          })
        return
      case 'stat-no':
        if (isShiftClick && isLeftClick)
          this.actor.update({ [`data.stats.${statName}.value`]: stat.value + 1 })
        if (!isShiftClick && isLeftClick)
          ui.notifications.info('Hold Shift while clicking to increase maximum stat value.')
        if (!isShiftClick && isRightClick)
          ui.notifications.info('Hold Shift while right-clicking to reduce maximum stat value.')
        return
    }
  }
}
